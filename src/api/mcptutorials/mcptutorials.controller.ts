import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MCPTutorialsService, CreateMCPTutorialDto, UpdateMCPTutorialDto } from './mcptutorials.service';
import { MCPTutorialEntity } from '../../entities/mcptutorial.entity';

@Controller('api/mcptutorials')
export class MCPTutorialsController {
  constructor(private readonly mcptutorialsService: MCPTutorialsService) {}

  @Post()
  async create(@Body() createMCPTutorialDto: CreateMCPTutorialDto): Promise<MCPTutorialEntity> {
    return this.mcptutorialsService.create(createMCPTutorialDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit: number, // Default to 4 for tutorial lists
  ): Promise<{data: MCPTutorialEntity[], total: number, page: number, limit: number}> {
    return this.mcptutorialsService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MCPTutorialEntity> {
    return this.mcptutorialsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMCPTutorialDto: UpdateMCPTutorialDto): Promise<MCPTutorialEntity> {
    return this.mcptutorialsService.update(id, updateMCPTutorialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MCPTutorialEntity> {
    return this.mcptutorialsService.remove(id);
  }
}
