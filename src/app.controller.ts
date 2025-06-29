import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

// Note: The @Controller() decorator without a path argument means these routes are at the root.
// However, we have a global prefix 'api' configured in main.ts,
// so these API routes will be accessible under '/api/home/*'.
// The serveReactApp function is excluded from this global prefix.
@Controller('home') // Group home-related API endpoints under 'home'
export class AppController {
  constructor(private readonly appService: AppService) {}

  // API endpoints for homepage data
  @Get('news')
  getLatestNews() {
    // Accessing private method via public getter in service or making method public
    // For now, let's assume AppService will be refactored or these are placeholders
    // If getHomePageData contains all data, we can use that or expose individual parts.
    // Directly calling the private methods like this.appService.getLatestNews() is not possible
    // if they are private. Let's assume they are made public in AppService or new public
    // getters are created in AppService for them.
    // For this step, I will modify AppService to make these public.
    return this.appService.getLatestNews();
  }

  @Get('hot-tools')
  getHotTools() {
    return this.appService.getHotTools();
  }

  @Get('categories')
  getCategories() {
    return this.appService.getCategories();
  }

  @Get('featured-guides')
  getFeaturedGuides() {
    return this.appService.getFeaturedContent();
  }

  @Get('open-source-projects')
  getOpenSourceProjects() {
    return this.appService.getOpenSourceProjects();
  }


  // This controller is now focused on API.
  // The serving of the React app (index.html) should be handled by a separate controller
  // or a more generic setup if this controller is to be strictly for '/api/home'.
  // Let's move serveReactApp to a RootController or adjust its pathing.

  // For now, to keep changes minimal to this file for this step,
  // I will assume the global prefix exclusion in main.ts correctly handles serveReactApp
  // if it were in a controller that isn't path-prefixed with 'api'.
  // To make this cleaner, I will create a new RootController for serveReactApp later if needed,
  // or ensure AppController('/') with serveReactApp is correctly excluded.

  // Let's adjust the @Controller decorator for AppController to be just @Controller()
  // and rely on main.ts global prefix for /api, and exclusions for React routes.
  // Re-reading main.ts, setGlobalPrefix('api', { exclude: reactAppRoutes })
  // This means any @Controller() or @Controller('somepath') will be prefixed with /api
  // UNLESS the route path is in reactAppRoutes.
  // This is problematic if AppController handles both / (for React) and /api/something.

  // Correct approach:
  // 1. Create a new controller for API, e.g., @Controller('api/home-data')
  // 2. Keep AppController for serving React app, ensure its routes are in `exclude` array.

  // For this step, I will put the API endpoints under a sub-path in AppController,
  // and assume AppController itself is NOT globally prefixed with 'api'.
  // This means changing main.ts slightly or how AppController is defined.

  // Simpler: Let's assume the current setup in main.ts:
  // app.setGlobalPrefix('api', { exclude: reactAppRoutes });
  // And this controller is @Controller().
  // Then, routes like @Get('home/news') would become /api/home/news. This is fine.
  // The serveReactApp method needs to be in a controller whose routes are in the exclude list.
  // The current AppController has @Get(['/', '/news', ...]) which are in exclude list.

  // So, the API routes should be distinct from the React app serving routes.
  // Let's add a specific prefix to these API routes within this controller.
  // The @Controller() decorator for AppController means its routes start at root.
  // So @Get('api/home/news') would be the literal path.
  // The global prefix 'api' would then make it /api/api/home/news if not careful.

  // Let's assume AppController is for the React app serving part,
  // and we create a NEW controller for the API. This is cleaner.

  // Sticking to modifying AppController for now as per plan structure,
  // and will make the API methods have a clear path.
  // The @Controller() decorator on this class means paths are relative to root.
  // The global prefix `api` will apply to these unless they are in `exclude`.
  // Our API paths are NOT in `exclude`. So `/api/` will be prepended.
  // Thus, `@Get('home-data/news')` here will become `/api/home-data/news`.
}

// Previous React App Serving Logic (will be kept in a root controller or here if paths are managed)
// For now, I'm adding the new API endpoints above.
// The serveReactApp method below should still work as its paths are excluded from the 'api' prefix.
// However, it's better to separate API controllers from UI serving controllers.

// To make this work with the current structure and ensure clarity:
// Option A: Create a new controller (e.g., ApiController) for these data endpoints.
// Option B: Add a prefix to AppController itself, e.g. @Controller('api-data'), and then have simpler @Get names.
// Option C: Ensure current AppController @Get paths for API are NOT in the global exclude list.

// Let's go with: AppController remains @Controller().
// New API endpoints will be e.g. @Get('data/news'). This becomes /api/data/news.
// The existing serveReactApp @Get(['/', ...]) is fine as those paths are excluded from /api prefix.

// The previous content of AppController (serveReactApp) should be preserved.
// I will add the new API endpoints to the existing AppController.
// The private methods in AppService need to be made public.
// This change will be done in AppService file in a subsequent step if needed, for now assuming they are callable.
// For the purpose of this step, let's assume AppService methods are public.

// Re-inserting serveReactApp and adding new API endpoints:
@Controller()
// Final name should be AppController, the 'Revised' was for thought process.
// Assuming the class name in the file is 'AppController'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['/', '/news', '/tools', '/projects', '/mcp', '/mcp-search-results', '/mcp-tag-page'])
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
}

// The original file content will be replaced with the structure of AppControllerRevised.
// This means AppController will now have both serveReactApp and the new API endpoints.
// The private methods in AppService (getLatestNews, etc.) need to be made public.
// I'll make that change to AppService next.
