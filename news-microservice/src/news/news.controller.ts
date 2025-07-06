import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from './entities/news.entity';
import { CreateNewsDto, UpdateNewsDto, NewsPageDataDto, NewsItemDto } from './dto/news.dto';

@Controller() // Define routes at the root of the microservice
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  private mapNewsEntityToDto(entity: NewsEntity): NewsItemDto {
    return {
      id: entity.id || entity._id.toString(),
      title: entity.title,
      date: entity.publishedAt.toISOString(),
      category: entity.category,
      image: entity.imageUrl,
      excerpt: entity.excerpt,
      views: entity.views,
    };
  }

  @Get('page-data')
  async getNewsPageData(
    // Potentially add query params for pagination/filtering for newsItems on this page
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('category') category?: string,
    @Query('isFeatured') isFeatured?: string,
  ): Promise<NewsPageDataDto> {
    const isFeaturedBool = isFeatured === undefined ? undefined : isFeatured === 'true';
    const newsServiceResponse = await this.newsService.findAll(category, isFeaturedBool, page, limit);

    const newsItems = newsServiceResponse.data.map(entity => this.mapNewsEntityToDto(entity));

    // Placeholder data for recommendedTools and popularTopics (as in monolith)
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
      newsItems, // Consider adding pagination info for newsItems if needed directly on page-data
      recommendedTools,
      popularTopics,
    };
  }

  @Post('articles')
  async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsItemDto> {
    const newsEntity = await this.newsService.create(createNewsDto);
    return this.mapNewsEntityToDto(newsEntity);
  }

  @Get('articles')
  async findAll(
    @Query('category') category?: string,
    @Query('isFeatured') isFeatured?: string, // 'true' or 'false'
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ): Promise<{ data: NewsItemDto[], total: number, page: number, limit: number }> {
    const isFeaturedBool = isFeatured === undefined ? undefined : isFeatured === 'true';
    const { data: entities, total, page: p, limit: l } = await this.newsService.findAll(category, isFeaturedBool, page, limit);
    const newsItemDtos = entities.map(entity => this.mapNewsEntityToDto(entity));
    return { data: newsItemDtos, total, page:p, limit:l };
  }

  @Get('articles/:id')
  async findOne(@Param('id') id: string): Promise<NewsItemDto> {
    const newsEntity = await this.newsService.findOne(id);
    if (!newsEntity) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return this.mapNewsEntityToDto(newsEntity);
  }

  @Put('articles/:id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto): Promise<NewsItemDto> {
    const updatedEntity = await this.newsService.update(id, updateNewsDto);
    return this.mapNewsEntityToDto(updatedEntity);
  }

  @Delete('articles/:id')
  async remove(@Param('id') id: string): Promise<NewsItemDto> {
    const deletedEntity = await this.newsService.remove(id);
    return this.mapNewsEntityToDto(deletedEntity);
  }
}
