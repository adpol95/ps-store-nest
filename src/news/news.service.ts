import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { GetNewsQueryDto } from "./dto/get-news-query.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: GetNewsQueryDto) {
    const where: Prisma.NewsWhereInput = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: "insensitive",
      };
    }

    return this.prisma.news.findMany({
      where,
      skip: query.skip,
      take: query.take,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findOne(id: string) {
    return this.prisma.news.findUnique({
      where: { id },
    });
  }
}

