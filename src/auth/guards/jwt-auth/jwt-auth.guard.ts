import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type Request } from "express";

interface JwtPayload {
  id: string;
  name: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.cookies?.["access_token"] as string | undefined;

    if (!accessToken) {
      throw new UnauthorizedException("No access token provided");
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(accessToken);
      request.user = payload;
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }

    return true;
  }
}
