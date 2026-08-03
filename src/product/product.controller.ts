import { Controller, Get, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { GetProductsQueryDto } from "./dto/get-products-query-dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    return this.productService.findAll(query);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.productService.remove(+id);
  // }
}
