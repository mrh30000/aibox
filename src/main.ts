import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { SeederService } from './database/seeder.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap'); // Create a logger instance

  // HBS模板引擎配置 (将被移除或注释掉)
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // HBS助手 (将被移除或注释掉)
  // hbs.registerHelper('add', function(a: number, b: number) { ... });
  // ... (other hbs helpers) ...
  // const paginationHelper = require('./common/hbs-helpers/pagination.helper');
  // paginationHelper.registerPaginationHelper();

  // 配置静态文件服务
  // 1. 'public' 文件夹中的现有静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 2. 'client' 文件夹中的静态资源 (例如 React 构建输出和 index.html)
  //    假设 React 构建输出到 'client/dist' 并且 index.html 在 'client' 根目录
  //    或者，如果 React 构建输出到 'dist/client' (当 'client' 是 'src' 的同级目录时，tsc 会这样做)
  //    我们需要确保路径正确。
  //    如果 `client/index.html` 和 React 的 JS bundle (例如 `client/dist/main.js` 或类似名称)
  //    最终位于 `dist/client/` 目录下 (当项目构建时，NestJS 的 `dist` 目录是根目录)
  //    那么我们需要像这样提供它们:
  //    app.useStaticAssets(join(__dirname, 'client')); // 这会将 'dist/client' 作为静态根目录
  //    这将允许访问 /index.html (来自 dist/client/index.html) 和 /dist/main.js (来自 dist/client/dist/main.js)

  //    更简单的方法是，如果 `client` 文件夹在构建后位于 `dist` 文件夹的根目录中，
  //    并且包含 `index.html` 和一个包含 JS/CSS 的 `static` (或 `dist`) 子文件夹。
  //    `process.cwd()` 指向项目根目录 (在开发中) 或 `dist` 目录 (在生产中，如果从 `dist` 运行)。
  //    `__dirname` 在 `dist/src` (或 `dist` 如果 main.ts 移到根目录) 中。

  //    假设:
  //    - client/index.html (源) -> dist/client/index.html (构建后)
  //    - client/src/*.tsx (源) -> client/dist/*.js (或类似名称, React 构建过程) -> dist/client/dist/*.js (构建后)
  //    为了让 `res.sendFile(join(process.cwd(), 'client', 'index.html'))` 工作，
  //    并且让 HTML 文件能够加载 JS 文件，我们需要正确设置静态服务。

  //    如果 `client` 目录被复制到 `dist` 目录的根目录 (即 `dist/client`)：
  app.useStaticAssets(join(__dirname, '..', 'client'), {
    // 例如, 如果 React 的构建文件在 'client/build' 文件夹中，则添加前缀
    // prefix: '/static-react', // (可选)
  });
  // 这将允许访问例如 `http://localhost:3000/index.html` (如果 index.html 在 client 文件夹的根目录中)
  // 以及 `http://localhost:3000/main.js` (如果 main.js 在 client 文件夹的根目录中, 通常是 client/dist/main.js)


  // 更新全局前缀排除
  // 我们现在有一个更广泛的捕获所有路由在 AppController 中服务 React 应用
  // 因此，我们只需要确保 'api' 前缀被应用，并且不会与我们的 React 路由冲突。
  // AppController 中的 @Get([...]) 路由没有前缀，所以它们将匹配根路径。
  // 全局前缀 'api' 将应用于所有其他控制器或未明确排除的控制器。
  const reactAppRoutes = ['/', '/news', '/tools', '/projects', '/mcp', '/mcp-search-results', '/mcp-tag-page'];
  app.setGlobalPrefix('api', {
    exclude: reactAppRoutes, // 排除所有已知的前端路由
  });

  // Get SeederService instance from the application context
  const seederService = app.get(SeederService);

  // Run seeders on application bootstrap (useful for development)
  // In production, you might want a dedicated script or CLI command.
  // Use an environment variable to control seeding, e.g., SEED_DB=true
  if (process.env.NODE_ENV === 'development' || process.env.SEED_DB === 'true') {
    logger.log('Development environment detected or SEED_DB is true. Attempting to run seeders...');
    try {
      await seederService.seedAll();
      logger.log('Seeding process completed successfully via bootstrap.');
    } catch (error) {
      logger.error('Error during database seeding:', error);
    }
  } else {
    logger.log('Skipping automatic seeding (NODE_ENV is not "development" or SEED_DB is not "true").');
  }

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  // Use logger for application start message
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
