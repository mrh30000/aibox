import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { CategoriesController } from './categories.controller'; // To be created if API endpoints are needed
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from '../../schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  // controllers: [CategoriesController], // Add if/when controller is created
  providers: [CategoriesService],
  exports: [CategoriesService]       // Export service if it needs to be used by other modules (e.g. by ToolsService)
})
export class CategoriesModule {}
