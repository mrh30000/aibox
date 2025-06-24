import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MCPServicesService, CreateMCPServceDto, UpdateMCPServceDto } from './mcpservices.service';
import { MCPServceEntity } from '../../entities/mcpservice.entity';

@Controller('api/mcpservices')
export class MCPServicesController {
  constructor(private readonly mcpservicesService: MCPServicesService) {}

  @Post()
  async create(@Body() createMCPServceDto: CreateMCPServceDto): Promise<MCPServceEntity> {
    return this.mcpservicesService.create(createMCPServceDto);
  }

  @Get()
  async findAll(
    @Query('tag') tag?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{data: MCPServceEntity[], total: number, page: number, limit: number}> {
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MCPServceEntity> {
    return this.mcpservicesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMCPServceDto: UpdateMCPServceDto): Promise<MCPServceEntity> {
    return this.mcpservicesService.update(id, updateMCPServceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MCPServceEntity> {
    return this.mcpservicesService.remove(id);
  }
}
