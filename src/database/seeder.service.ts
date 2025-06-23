import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tool } from '../../schemas/tool.schema';
import { News } from '../../schemas/news.schema';
import { Project } from '../../schemas/project.schema';
import { Category } from '../../schemas/category.schema';
// Import DTOs or Entities if needed for structuring seed data
// For example: import { CreateCategoryDto } from '../../api/categories/categories.service';

// Import individual seeder functions/data arrays
import { categoriesSeed } from './seeds/category.seed';
import { toolsSeed } from './seeds/tool.seed';
import { newsSeed } from './seeds/news.seed';
import { projectsSeed } from './seeds/project.seed';


@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Tool.name) private readonly toolModel: Model<Tool>,
    @InjectModel(News.name) private readonly newsModel: Model<News>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    // Potentially inject CategoriesService if complex category lookup/creation is needed by other seeders
    // private readonly categoriesService: CategoriesService,
  ) {}

  async seedAll() {
    this.logger.log('Starting database seeding process...');

    await this.seedCategories();
    await this.seedTools();
    await this.seedNews();
    await this.seedProjects();

    this.logger.log('Database seeding completed.');
  }

  private async seedCategories() {
    this.logger.log('Seeding categories...');
    const existingCategoriesCount = await this.categoryModel.countDocuments();
    if (existingCategoriesCount === 0) {
      for (const categoryData of categoriesSeed) {
        // Simple slug generation, can be more robust
        const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-');
        // If parentCategory is a name, we might need to find its ID first.
        // For simplicity, seed data should use slugs or have a way to map.
        // Here, assuming parentCategory in seed data is a slug of an already seeded/to-be-seeded parent.

        let parentId = null;
        if (categoryData.parentCategorySlug) {
            const parent = await this.categoryModel.findOne({ slug: categoryData.parentCategorySlug }).exec();
            if (parent) {
                parentId = parent._id;
            } else {
                this.logger.warn(`Parent category with slug "${categoryData.parentCategorySlug}" not found for "${categoryData.name}". Seeding as top-level.`);
            }
        }

        await this.categoryModel.create({ ...categoryData, slug, parentCategory: parentId });
      }
      this.logger.log('Categories seeded.');
    } else {
      this.logger.log('Categories collection is not empty. Skipping seeding.');
    }
  }

  private async seedTools() {
    this.logger.log('Seeding tools...');
    const existingToolsCount = await this.toolModel.countDocuments();
    if (existingToolsCount === 0) {
      for (const toolData of toolsSeed) {
        // If toolData.category is a category name/slug, find the category ID first
        const category = await this.categoryModel.findOne({ slug: toolData.categorySlug }).exec();
        if (category) {
          await this.toolModel.create({ ...toolData, category: category._id }); // Store category ID
        } else {
          this.logger.warn(`Category with slug "${toolData.categorySlug}" not found for tool "${toolData.name}". Skipping this tool.`);
        }
      }
      this.logger.log('Tools seeded.');
    } else {
      this.logger.log('Tools collection is not empty. Skipping seeding.');
    }
  }

  private async seedNews() {
    this.logger.log('Seeding news...');
    const existingNewsCount = await this.newsModel.countDocuments();
    if (existingNewsCount === 0) {
       for (const newsData of newsSeed) {
        const category = await this.categoryModel.findOne({ slug: newsData.categorySlug }).exec();
        if (category) {
          await this.newsModel.create({ ...newsData, category: category._id });
        } else {
          this.logger.warn(`Category with slug "${newsData.categorySlug}" not found for news "${newsData.title}". Skipping this news item.`);
        }
      }
      this.logger.log('News seeded.');
    } else {
      this.logger.log('News collection is not empty. Skipping seeding.');
    }
  }

  private async seedProjects() {
    this.logger.log('Seeding projects...');
    const existingProjectsCount = await this.projectModel.countDocuments();
    if (existingProjectsCount === 0) {
      for (const projectData of projectsSeed) {
        const category = await this.categoryModel.findOne({ slug: projectData.categorySlug }).exec();
        if (category) {
          await this.projectModel.create({ ...projectData, category: category._id });
        } else {
          this.logger.warn(`Category with slug "${projectData.categorySlug}" not found for project "${projectData.name}". Skipping this project.`);
        }
      }
      this.logger.log('Projects seeded.');
    } else {
      this.logger.log('Projects collection is not empty. Skipping seeding.');
    }
  }
}
