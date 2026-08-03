import { Injectable } from "@nestjs/common";
import { GetProductsQueryDto } from "./dto/get-products-query-dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  // create(createProductDto: CreateProductDto) {
  //   return "This action adds a new product";
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }

  async findAll(query: GetProductsQueryDto) {
    const where: Prisma.ProductWhereInput = {};

    if (query.category) {
      where.type = query.category;
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: "insensitive", // 👈 Регистронезависимый поиск в Postgres
      };
    }

    if (query.minPrice || query.maxPrice) {
      where.price = {
        gte: query.minPrice,
        lte: query.maxPrice,
      };
    }

    if (query.genre) {
      where.gameDetails = {
        genres: {
          has: query.genre,
        },
      };
    }

    const products = await this.prisma.product.findMany({
      where,
      skip: query.skip,
      take: query.take,
      // include: {
      //   gameDetails: true, // 👈 Подключаем вложенные данные
      // },
    });
    return products;
  }
}
