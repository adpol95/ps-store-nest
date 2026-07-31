import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    switch (exception.code) {
      case "P2002": {
        const status = HttpStatus.CONFLICT;
        const target = Array.isArray(exception.meta?.target)
          ? ` (${(exception.meta?.target as string[]).join(", ")})`
          : "";

        response.status(status).json({
          statusCode: status,
          message: `Запись с такими уникальными данными уже существует${target}`,
          error: "Conflict",
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }
      case "P2025": {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: "Запрашиваемая запись не найдена",
          error: "Not Found",
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }
      default: {
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
          statusCode: status,
          message: `Ошибка работы с базой данных (код: ${exception.code})`,
          error: "Internal Server Error",
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      }
    }
  }
}
