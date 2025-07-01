import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

// Note: The @Controller() decorator without a path argument means these routes are at the root.
// However, we have a global prefix 'api' configured in main.ts,
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['/', '/news', '/tools', '/projects', '/mcp', '/mcp/search-results', '/mcp/tag-page']) // Changed /mcp-search-results to /mcp/search-results and /mcp-tag-page to /mcp/tag-page
  serveReactApp(@Res() res: Response) {
    // In production, __dirname is likely <project_root>/dist/src
    // We copied client files to <project_root>/dist/client
    // So the path should be ../client/index.html from dist/src
    return res.sendFile(join(__dirname, '..', 'client', 'index.html'));
  }

  // API Endpoints for Home Page Data
  // These will be prefixed with /api by global prefix in main.ts
  @Get('home-data/news')
  getHomeNewsData() {
    return this.appService.getLatestNews();
  }

  @Get('home-data/hot-tools')
  getHomeHotToolsData() {
    return this.appService.getHotTools();
  }

  @Get('home-data/categories')
  getHomeCategoriesData() {
    return this.appService.getCategories();
  }

  @Get('home-data/featured-guides')
  getHomeFeaturedGuidesData() {
    return this.appService.getFeaturedContent();
  }

  @Get('home-data/open-source-projects')
  getHomeOpenSourceProjectsData() {
    return this.appService.getOpenSourceProjects();
  }

  // API Endpoint for News Page Data
  @Get('news-page-data') // This will become /api/news-page-data
  getNewsPageAggregatedData() {
    return this.appService.getNewsPageData();
  }

  // API Endpoint for Tools Page Data
  @Get('tools-page-data') // This will become /api/tools-page-data
  getToolsPageAggregatedData(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string, // Query params are strings
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10; // Default limit
    return this.appService.getToolsPageData(category, sort, pageNumber, limitNumber);
  }

  // API Endpoint for Projects Page Data
  @Get('projects-page-data') // This will become /api/projects-page-data
  getProjectsPageAggregatedData(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
    @Query('time') time?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 5; // Default limit for projects
    return this.appService.getProjectsPageData(category, sort, time, pageNumber, limitNumber);
  }

  // API Endpoint for MCP Landing Page Data
  @Get('mcp/landing-page-data') // This will become /api/mcp/landing-page-data
  getMcpLandingPageData() {
    return this.appService.getMcpLandingPageData();
  }

  // API Endpoint for MCP Search
  @Get('mcp/search') // This will become /api/mcp/search
  searchMcpServices(
    @Query('q') query: string = '',
    @Query('page') page?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    // Limit can be fixed or also a query param if needed
    const limit = 10;
    return this.appService.searchMcpServices(query, pageNumber, limit);
  }

  // API Endpoint for MCP Tag Page Data
  @Get('mcp/tag/:tagSlug') // This will become /api/mcp/tag/:tagSlug
  getMcpServicesByTag(
    @Param('tagSlug') tagSlug: string,
    @Query('lang') lang?: string,
    @Query('verified') verified?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10; // Default limit
    return this.appService.getMcpServicesByTag(tagSlug, lang, verified, sort, pageNumber, limitNumber);
  }
}
