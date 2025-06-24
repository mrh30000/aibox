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

  // 配置模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // 注册 handlebars 助手
  hbs.registerHelper('add', function(a: number, b: number) {
    return a + b;
  });

  hbs.registerHelper('formatNumber', function(num: number) {
    if (typeof num !== 'number') return num; // Handle non-numeric gracefully
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  });

  hbs.registerHelper('formatDate', function(date: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return '';
    const d = new Date(date);
    // Basic date formatting, for more complex needs, a library like date-fns or moment would be better
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);

    if (format === 'YYYY-MM-DD HH:mm:ss') {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    }
    return d.toLocaleDateString(); // Fallback
  });


  // 配置静态文件服务
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 设置全局前缀，但排除页面路由
  app.setGlobalPrefix('api', {
    exclude: ['/', '/news', '/tools', '/projects'],
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
