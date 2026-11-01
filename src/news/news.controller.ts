import { Controller, Get, Param, Query } from "@nestjs/common";
import { NewsService } from "./news.service";
import { GetNewsQueryDto } from "./dto/get-news-query.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query() query: GetNewsQueryDto) {
    return this.newsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
  }
}
