import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ToolsService, CreateToolDto, UpdateToolDto } from './tools.service';
import { ToolEntity } from '../../entities/tool.entity';

@Controller('api/tools') // Standardized API prefix
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  async create(@Body() createToolDto: CreateToolDto): Promise<ToolEntity> {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  async findAll(
    // Basic filtering and pagination, can be expanded
    @Query('category') category?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{
    data: ToolEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    // More sophisticated filtering/sorting would be added in the service
    // For now, a simple findAll
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const tools = await this.toolsService.findAll(); // This needs to be enhanced for actual filtering/pagination

    // Basic manual filtering for demonstration if service doesn't support it yet
    let filteredTools = tools;
    if (category) {
      filteredTools = filteredTools.filter(
        (tool) => tool.category === category,
      );
    }
    if (isFeatured !== undefined) {
      filteredTools = filteredTools.filter(
        (tool) => tool.isFeatured === (isFeatured === 'true'),
      );
    }

    const total = filteredTools.length;
    const paginatedTools = filteredTools.slice(
      (pageNum - 1) * limitNum,
      pageNum * limitNum,
    );

    return { data: paginatedTools, total, page: pageNum, limit: limitNum };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ToolEntity> {
    const tool = await this.toolsService.findOne(id);
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return tool;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateToolDto: UpdateToolDto,
  ): Promise<ToolEntity> {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ToolEntity> {
    return this.toolsService.remove(id);
  }

  // TODO: Re-implement search and trending if needed, using the service layer
  // @Get('search')
  // searchTools(@Query('q') query: string) { ... }

  // @Get('trending')
  // getTrendingTools() { ... }
}
