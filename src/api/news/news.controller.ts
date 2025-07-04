import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { NewsService, CreateNewsDto, UpdateNewsDto, NewsPageDataDto, NewsItemDto } from './news.service';
import { NewsEntity } from '../../entities/news.entity';

@Controller('api/news') // Standardized API prefix for news-related endpoints
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

import { Types } from 'mongoose'; // Import Types

  private mapNewsEntityToDto(entity: NewsEntity): NewsItemDto {
    // entity.id is a virtual getter from Mongoose that returns string version of _id
    // Prefer entity.id as it's usually available and correctly typed.
    // If _id must be accessed directly and its type is 'unknown' or 'any',
    // casting might be needed for toString(), e.g., (entity._id as Types.ObjectId).toString()
    // or (entity._id as any).toString().
    // However, entity.id should be sufficient and safer.
    const id = entity.id || (entity._id as Types.ObjectId)?.toString();
    if (!id) {
      // This case should ideally not happen for a saved Mongoose document
      console.error('Error mapping NewsEntity: ID is missing.', entity);
      throw new Error('Failed to map NewsEntity due to missing ID.');
    }
    return {
      id: id,
      title: entity.title,
      date: entity.publishedAt.toISOString(),
      category: entity.category,
      image: entity.imageUrl,
      excerpt: entity.excerpt,
      views: entity.views,
    };
  }

  @Get('page-data') // This will be accessible at GET /api/news/page-data
  async getNewsPageData(): Promise<NewsPageDataDto> {
    const newsEntities = await this.newsService.findAll();
    const newsItems = newsEntities.map(entity => this.mapNewsEntityToDto(entity));

    const recommendedTools = [
      { id: 1, name: 'ChatGPT', description: '智能对话助手', icon: 'https://ext.same-assets.com/155488376/946268843.jpeg'},
      { id: 2, name: 'Claude 4', description: '高级AI助手', icon: 'https://ext.same-assets.com/155488376/614836080.jpeg'},
    ];
    const popularTopics = [
      { id: 'ai-ethics', name: 'AI Ethics' },
      { id: 'generative-ai', name: 'Generative AI' },
      { id: 'llms', name: 'Large Language Models' },
    ];

    return {
      newsItems,
      recommendedTools,
      popularTopics,
    };
  }

  // Existing CRUD operations for news articles
  @Post() // Path becomes POST /api/news
  async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.create(createNewsDto);
  }

  @Get() // Path becomes GET /api/news
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
