import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../../schemas/project.schema';
import { ProjectEntity } from '../../entities/project.entity'; // For DTOs or type hints

export class CreateProjectDto {
    name: string;
    description: string;
    category: string; // Later, this could be Category ID
    longDescription?: string;
    projectUrl?: string;
    repositoryUrl?: string;
    demoUrl?: string;
    tags?: string[];
    status?: 'active' | 'archived' | 'in-development';
    license?: string;
    imageUrl?: string;
    screenshots?: string[];
    programmingLanguages?: string[];
    technologiesUsed?: string[];
    stars?: number;
    forks?: number;
    contributors?: number;
    lastCommitDate?: Date;
    isFeatured?: boolean;
    projectCreatedAt?: Date;
    projectUpdatedAt?: Date;
}

export class UpdateProjectDto extends CreateProjectDto {}

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return updatedProject;
  }

  async remove(id: string): Promise<ProjectEntity> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return deletedProject;
  }
}
