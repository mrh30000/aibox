import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProjectsService, CreateProjectDto, UpdateProjectDto } from './projects.service';
import { ProjectEntity } from '../../entities/project.entity';

@Controller('api/projects') // Standardized API prefix
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{ data: ProjectEntity[], total: number, page: number, limit: number }> {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // This should be enhanced in the service for proper filtering and pagination
    const projects = await this.projectsService.findAll();

    let filteredProjects = projects;
    if (category) {
      filteredProjects = filteredProjects.filter(project => project.category === category);
    }
     if (isFeatured !== undefined) {
      filteredProjects = filteredProjects.filter(project => project.isFeatured === (isFeatured === 'true'));
    }

    const total = filteredProjects.length;
    const paginatedProjects = filteredProjects.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return { data: paginatedProjects, total, page: pageNum, limit: limitNum };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectEntity> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectsService.remove(id);
  }

  // TODO: Re-implement search, trending, and categories endpoints if needed, using the service layer
  // @Get('search')
  // searchProjects(@Query('q') query: string) { ... }

  // @Get('trending')
  // getTrendingProjects() { ... }

  // @Get('categories')
  // getCategories() { ... } // This should probably go to a CategoriesController
}
