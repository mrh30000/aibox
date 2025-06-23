import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { NewsService, CreateNewsDto, UpdateNewsDto } from './news.service';
import { NewsEntity } from '../../entities/news.entity';

@Controller('api/news') // Standardized API prefix
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{ data: NewsEntity[], total: number, page: number, limit: number }> {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // This should be enhanced in the service for proper filtering and pagination
    const newsItems = await this.newsService.findAll();

    let filteredNews = newsItems;
    if (category) {
      filteredNews = filteredNews.filter(item => item.category === category);
    }
    if (isFeatured !== undefined) {
      filteredNews = filteredNews.filter(item => item.isFeatured === (isFeatured === 'true'));
    }

    const total = filteredNews.length;
    const paginatedNews = filteredNews.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return { data: paginatedNews, total, page: pageNum, limit: limitNum };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NewsEntity> {
    const newsItem = await this.newsService.findOne(id);
    if (!newsItem) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return newsItem;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<NewsEntity> {
    return this.newsService.remove(id);
  }

  // TODO: Re-implement search and trending if needed, using the service layer
  // @Get('search')
  // searchNews(@Query('q') query: string) { ... }

  // @Get('trending')
  // getTrendingNews() { ... }
}
