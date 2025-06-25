import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { databaseConfig } from './config/database.config';
import { ToolsModule } from './api/tools/tools.module';
import { NewsModule } from './api/news/news.module';
import { ProjectsModule } from './api/projects/projects.module';
import { CategoriesModule } from './api/categories/categories.module';
import { SeederModule } from './database/seeder.module'; // Import SeederModule
// Controllers are now part of their respective modules, remove direct import here if not used by AppController

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    ToolsModule,
    NewsModule,
    ProjectsModule,
    CategoriesModule,
    SeederModule,
    MCPServicesModule,
    MCPTutorialsModule,
    InfoCardsModule,
    FAQItemsModule, // Add FAQItemsModule
  ],
  controllers: [AppController, MCPPageController],
  providers: [AppService],
})
export class AppModule {}
