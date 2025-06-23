import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // 注册 handlebars 助手
  hbs.registerHelper('add', function(a: number, b: number) {
    return a + b;
  });

  hbs.registerHelper('formatNumber', function(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  });

  // 配置静态文件服务
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 设置全局前缀，但排除页面路由
  app.setGlobalPrefix('api', {
    exclude: ['/', '/news', '/tools', '/projects'],
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
