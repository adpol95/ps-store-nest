import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Session } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        name: loginDto.login,
      },
    });

    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { name: user.name, id: user.id };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });

    await this.prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: await bcrypt.hash(refreshToken, 10),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    let payload: { id: string; name: string };
    try {
      payload = await this.jwtService.verifyAsync<{ id: string; name: string }>(
        refreshToken,
      );
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const sessions = await this.prisma.session.findMany({
      where: { userId: payload.id },
    });

    let currentSession: Session | null = null;
    for (const session of sessions) {
      const isMatched = await bcrypt.compare(refreshToken, session.tokenHash);
      if (isMatched) {
        currentSession = session;
        break;
      }
    }

    if (!currentSession) {
      throw new UnauthorizedException(
        "Session not found or invalid refresh token",
      );
    }

    if (currentSession.expiresAt < new Date()) {
      await this.prisma.session.delete({ where: { id: currentSession.id } });
      throw new UnauthorizedException("Session expired");
    }

    const newPayload = { id: payload.id, name: payload.name };
    const newRefreshToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: "7d",
    });

    await this.prisma.session.update({
      where: { id: currentSession.id },
      data: {
        tokenHash: await bcrypt.hash(newRefreshToken, 10),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const newAccessToken = await this.jwtService.signAsync(newPayload);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
