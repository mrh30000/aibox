import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Tool, ToolSchema } from '../schemas/tool.schema';
import { News, NewsSchema } from '../schemas/news.schema';
import { Project, ProjectSchema } from '../schemas/project.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { MCPServce, MCPServceSchema } from '../schemas/mcpservice.schema';
import { MCPTutorial, MCPTutorialSchema } from '../schemas/mcptutorial.schema';
import { InfoCard, InfoCardSchema } from '../schemas/infocard.schema';
import { FAQItem, FAQItemSchema } from '../schemas/faqitem.schema';
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
      { name: MCPServce.name, schema: MCPServceSchema },
      { name: MCPTutorial.name, schema: MCPTutorialSchema },
      { name: InfoCard.name, schema: InfoCardSchema },
      { name: FAQItem.name, schema: FAQItemSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
