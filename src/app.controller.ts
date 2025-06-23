import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHome() {
    return this.appService.getHomePageData();
  }

  @Get('news')
  @Render('news')
  getNews() {
    return this.appService.getNewsData();
  }

  @Get('tools')
  @Render('tools')
  getTools() {
    return this.appService.getToolsData();
  }

  @Get('projects')
  @Render('projects')
  getProjects() {
    return this.appService.getProjectsData();
  }
}
