import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MCPServce } from '../../schemas/mcpservice.schema'; // Corrected class name
import { MCPServceEntity } from '../../entities/mcpservice.entity';

// DTOs for MCPServce
export class CreateMCPServceDto {
    name: string;
    description: string;
    longDescription?: string;
    imageUrl?: string;
    languageOrTech?: string;
    userCountOrStars?: number;
    rating?: number;
    isVerified?: boolean;
    externalServiceUrl?: string;
    tags?: string[];
    addedToPlatformAt?: Date;
}

export class UpdateMCPServceDto extends CreateMCPServceDto {}

@Injectable()
export class MCPServicesService {
  constructor(@InjectModel(MCPServce.name) private mcpserviceModel: Model<MCPServce>) {}

  async create(createMCPServceDto: CreateMCPServceDto): Promise<MCPServceEntity> {
    const newService = new this.mcpserviceModel(createMCPServceDto);
    return newService.save();
  }

  async findAll(
    // Basic filtering options, can be expanded
    tag?: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{data: MCPServceEntity[], total: number, page: number, limit: number}> {
    const query = tag ? { tags: tag } : {};
    const skip = (page - 1) * limit;

    const data = await this.mcpserviceModel.find(query)
      .sort({ userCountOrStars: -1, rating: -1, name: 1 }) // Example sort
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.mcpserviceModel.countDocuments(query);
    return { data, total, page, limit };
  }

  async findPopular(limit: number = 8): Promise<MCPServceEntity[]> {
    return this.mcpserviceModel
      .find()
      .sort({ userCountOrStars: -1, rating: -1 })
      .limit(limit)
      .exec();
  }

  async findFeatured(limit: number = 8): Promise<MCPServceEntity[]> {
    return this.mcpserviceModel
      .find({ isVerified: true }) // Assuming featured means verified
      .sort({ rating: -1, userCountOrStars: -1 })
      .limit(limit)
      .exec();
  }

  async findRecent(limit: number = 8): Promise<MCPServceEntity[]> {
    return this.mcpserviceModel
      .find()
      .sort({ addedToPlatformAt: -1 })
      .limit(limit)
      .exec();
  }

  async searchByNameOrDescription(
    searchTerm: string,
    limit: number = 10,
    page: number = 1,
  ): Promise<{ data: MCPServceEntity[]; total: number; page: number; limit: number }> {
    const query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    };
    const skip = (page - 1) * limit;
    const data = await this.mcpserviceModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.mcpserviceModel.countDocuments(query);
    return { data, total, page, limit };
  }

  async findCategorizedServices(
    limitPerCategory: number = 3,
  ): Promise<
    { categoryName: string; categorySlug: string; services: MCPServceEntity[]; hasMore: boolean }[]
  > {
    const categories = await this.mcpserviceModel.distinct('tags').exec();
    const result = await Promise.all(
      categories.map(async (tag) => {
        const services = await this.mcpserviceModel
          .find({ tags: tag })
          .sort({ userCountOrStars: -1, rating: -1 })
          .limit(limitPerCategory + 1) // Fetch one more to check if there are more
          .exec();
        return {
          categoryName: tag, // You might want to map this to a more user-friendly name
          categorySlug: tag.toLowerCase().replace(/\s+/g, '-'), // Simple slug generation
          services: services.slice(0, limitPerCategory),
          hasMore: services.length > limitPerCategory,
        };
      }),
    );
    return result.filter((group) => group.services.length > 0); // Only return categories with services
  }

  async searchServices({
    query,
    page = 1,
    limit = 10,
    sort = 'name',
    languageOrTech,
    isVerified,
  }: {
    query?: string;
    page?: number;
    limit?: number;
    sort?: string;
    languageOrTech?: string;
    isVerified?: boolean;
  }): Promise<{ services: MCPServceEntity[]; total: number; totalPages: number }> {
    const findQuery: any = {};
    if (query) {
      findQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ];
    }
    if (languageOrTech) {
      findQuery.languageOrTech = languageOrTech;
    }
    if (typeof isVerified === 'boolean') {
      findQuery.isVerified = isVerified;
    }

    const sortQuery: any = {};
    switch (sort) {
      case 'popularity':
        sortQuery.userCountOrStars = -1;
        break;
      case 'rating':
        sortQuery.rating = -1;
        break;
      case 'recent':
        sortQuery.addedToPlatformAt = -1;
        break;
      case 'name':
      default:
        sortQuery.name = 1;
        break;
    }

    const total = await this.mcpserviceModel.countDocuments(findQuery);
    const services = await this.mcpserviceModel
      .find(findQuery)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { services, total, totalPages: Math.ceil(total / limit) };
  }

  async findServicesByTag({
    tag,
    page = 1,
    limit = 10,
    sort = 'name',
    languageOrTech,
    isVerified,
  }: {
    tag: string;
    page?: number;
    limit?: number;
    sort?: string;
    languageOrTech?: string;
    isVerified?: boolean;
  }): Promise<{ services: MCPServceEntity[]; total: number; totalPages: number }> {
    const findQuery: any = { tags: tag };
    if (languageOrTech) {
      findQuery.languageOrTech = languageOrTech;
    }
    if (typeof isVerified === 'boolean') {
      findQuery.isVerified = isVerified;
    }

    const sortQuery: any = {};
    switch (sort) {
      case 'popularity':
        sortQuery.userCountOrStars = -1;
        break;
      case 'rating':
        sortQuery.rating = -1;
        break;
      case 'recent':
        sortQuery.addedToPlatformAt = -1;
        break;
      case 'name':
      default:
        sortQuery.name = 1;
        break;
    }

    const total = await this.mcpserviceModel.countDocuments(findQuery);
    const services = await this.mcpserviceModel
      .find(findQuery)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { services, total, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<MCPServceEntity> {
    const service = await this.mcpserviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return service;
  }

  async update(
    id: string,
    updateMCPServceDto: UpdateMCPServceDto,
  ): Promise<MCPServceEntity> {
    const updatedService = await this.mcpserviceModel
      .findByIdAndUpdate(id, updateMCPServceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return updatedService;
  }

  async remove(id: string): Promise<MCPServceEntity> {
    const deletedService = await this.mcpserviceModel.findByIdAndDelete(id).exec();
    if (!deletedService) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return deletedService;
  }
}
