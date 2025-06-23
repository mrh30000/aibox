import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Tool, ToolSchema } from '../../schemas/tool.schema';
import { News, NewsSchema } from '../../schemas/news.schema';
import { Project, ProjectSchema } from '../../schemas/project.schema';
import { Category, CategorySchema } from '../../schemas/category.schema';
// Import your data modules if seeders need to use their services, though direct model injection is often simpler for seeding.
// For example: import { CategoriesModule } from '../../api/categories/categories.module';

@Module({
  imports: [
    // Ensure Mongoose is configured. If your AppModule already does this globally, this might not be strictly needed here
    // unless you have a separate DB connection for seeding or want explicit dependency.
    // For simplicity, assuming the main MongooseModule.forRoot is in AppModule.
    MongooseModule.forFeature([
      { name: Tool.name, schema: ToolSchema },
      { name: News.name, schema: NewsSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    // If CategoriesService is used by other seeders to find/create categories:
    // CategoriesModule,
  ],
  providers: [SeederService],
  exports: [SeederService], // Export if you plan to inject SeederService elsewhere (e.g. in main.ts)
})
export class SeederModule {}
