import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { SeederModule } from './database/seeder.module'; // Re-import SeederModule
import { ToolsModule } from './api/tools/tools.module'; // Re-import ToolsModule
import { NewsModule } from './api/news/news.module'; // Re-import NewsModule
import { ProjectsModule } from './api/projects/projects.module'; // Re-import ProjectsModule
import { CategoriesModule } from './api/categories/categories.module'; // Re-import CategoriesModule
import { MCPServicesModule } from './api/mcpservices/mcpservices.module'; // Re-import MCPServicesModule
import { MCPTutorialsModule } from './api/mcptutorials/mcptutorials.module'; // Re-import MCPTutorialsModule
import { InfoCardsModule } from './api/infocards/infocards.module'; // Re-import InfoCardsModule
import { FAQItemsModule } from './api/faqitems/faqitems.module'; // Re-import FAQItemsModule
import { MCPPageController } from './controllers/mcp.controller'; // Re-import MCPPageController

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    SeederModule, // Re-add SeederModule
    ToolsModule,
    NewsModule,
    ProjectsModule,
    CategoriesModule,
    MCPServicesModule,
    MCPTutorialsModule,
    InfoCardsModule,
    FAQItemsModule,
  ],
  controllers: [AppController, MCPPageController], // Re-add MCPPageController
  providers: [AppService],
})
export class AppModule {}
