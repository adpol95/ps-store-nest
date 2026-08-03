import { ProductType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class GetProductsQueryDto {
  @IsOptional()
  @IsEnum(ProductType)
  category?: ProductType;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  platform: string;

  @IsOptional()
  @IsString()
  search: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  skip?: number = 0;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  take?: number = 10;
}
