import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { type Request, type Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(loginDto);

    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 5 * 1000, // 1 hour
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.["refresh_token"] as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }

    const tokens = await this.authService.refresh(refreshToken);

    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
