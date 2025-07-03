import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../schemas/category.schema';
import { CategoryEntity } from '../../entities/category.entity'; // For DTOs or type hints

export class CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    parentCategory?: string; // ID of parent category
    iconUrl?: string;
    imageUrl?: string;
    displayOrder?: number;
    isFeatured?: boolean;
}

export class UpdateCategoryDto {
    name?: string;
    slug?: string;
    description?: string;
    parentCategory?: string;
    iconUrl?: string;
    imageUrl?: string;
    displayOrder?: number;
    isFeatured?: boolean;
}

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    // Check for slug uniqueness before creating
    const existingCategory = await this.categoryModel.findOne({ slug: createCategoryDto.slug }).exec();
    if (existingCategory) {
      throw new ConflictException(`Category with slug "${createCategoryDto.slug}" already exists.`);
    }
    const newCategory = new this.categoryModel(createCategoryDto);
    const savedCategory = await newCategory.save();
    return savedCategory.toObject({ getters: true, virtuals: true }); // Convert to plain object and apply getters
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoryModel.find().populate('parentCategory').sort({ displayOrder: 1, name: 1 }).exec();
    return categories.map(category => category.toObject({ getters: true, virtuals: true }));
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.categoryModel.findById(id).populate('parentCategory').exec();
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category.toObject({ getters: true, virtuals: true });
  }

  async findBySlug(slug: string): Promise<CategoryEntity> {
    const category = await this.categoryModel.findOne({ slug }).populate('parentCategory').exec();
    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }
    return category.toObject({ getters: true, virtuals: true });
  }


  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    if (updateCategoryDto.slug) {
      const existingCategory = await this.categoryModel.findOne({ slug: updateCategoryDto.slug, _id: { $ne: id } }).exec();
      if (existingCategory) {
        throw new ConflictException(`Category with slug "${updateCategoryDto.slug}" already exists.`);
      }
    }
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).populate('parentCategory').exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return updatedCategory.toObject({ getters: true, virtuals: true });
  }

  async remove(id: string): Promise<CategoryEntity> {
    // Consider implications: what happens to items in this category?
    // For now, simple delete. Could add checks for child categories or associated items.
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return deletedCategory.toObject({ getters: true, virtuals: true });
  }
}
