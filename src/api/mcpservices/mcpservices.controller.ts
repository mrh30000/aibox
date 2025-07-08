import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  MCPServicesService,
  CreateMCPServceDto,
  UpdateMCPServceDto,
} from './mcpservices.service';
import { MCPServceEntity } from '../../entities/mcpservice.entity';

@Controller('api/mcpservices')
export class MCPServicesController {
  constructor(private readonly mcpservicesService: MCPServicesService) {}

  @Post()
  async create(
    @Body() createMCPServceDto: CreateMCPServceDto,
  ): Promise<MCPServceEntity> {
    return this.mcpservicesService.create(createMCPServceDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('tag') tag?: string, // Optional parameter moved to the end
  ): Promise<{
    data: MCPServceEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.mcpservicesService.findAll(tag, limit, page);
  }

  @Get('featured')
  async findFeatured(
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
  ): Promise<MCPServceEntity[]> {
    return this.mcpservicesService.findFeatured(limit);
  }

  @Get('recent')
  async findRecent(
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
  ): Promise<MCPServceEntity[]> {
    return this.mcpservicesService.findRecent(limit);
  }

  @Get('search')
  async search(
    @Query('q') searchTerm: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: MCPServceEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    if (!searchTerm || searchTerm.trim() === '') {
      // Optionally, return all items or a specific message if search term is empty
      // For now, let service handle empty search term if it's designed to list all
      // Or throw BadRequestException: throw new BadRequestException('Search term cannot be empty');
    }
    return this.mcpservicesService.searchByNameOrDescription(
      searchTerm,
      limit,
      page,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MCPServceEntity> {
    return this.mcpservicesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMCPServceDto: UpdateMCPServceDto,
  ): Promise<MCPServceEntity> {
    return this.mcpservicesService.update(id, updateMCPServceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MCPServceEntity> {
    return this.mcpservicesService.remove(id);
  }
}
