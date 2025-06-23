import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ToolsController } from './api/tools/tools.controller';
import { NewsController } from './api/news/news.controller';
import { ProjectsController } from './api/projects/projects.controller';
import { Tool, ToolSchema } from './schemas/tool.schema';
import { News, NewsSchema } from './schemas/news.schema';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    MongooseModule.forFeature([
      { name: Tool.name, schema: ToolSchema },
      { name: News.name, schema: NewsSchema },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, ToolsController, NewsController, ProjectsController],
  providers: [AppService],
})
export class AppModule {}
