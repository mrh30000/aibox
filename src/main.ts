import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as hbs from 'hbs'; // Re-import hbs
import { SeederService } from './database/seeder.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter'; // Re-enable

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter()); // Re-enable global exception filter

  // Configure Handlebars template engine
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(process.cwd(), 'views', 'partials'));

  // Register Handlebars helpers
  hbs.registerHelper('eq', (a, b) => a === b);
  hbs.registerHelper('ne', (a, b) => a !== b);
  hbs.registerHelper('json', (context) => JSON.stringify(context));
  hbs.registerHelper('gt', (a, b) => a > b);
  hbs.registerHelper('lt', (a, b) => a < b);
  hbs.registerHelper('add', (a, b) => a + b);
  hbs.registerHelper('subtract', (a, b) => a - b);
  hbs.registerHelper('multiply', (a, b) => a * b);
  hbs.registerHelper('divide', (a, b) => a / b);
  hbs.registerHelper('mod', (a, b) => a % b);
  hbs.registerHelper('and', (a, b) => a && b);
  hbs.registerHelper('or', (a, b) => a || b);
  hbs.registerHelper('not', (a) => !a);
  hbs.registerHelper('ternary', (condition, trueValue, falseValue) =>
    condition ? trueValue : falseValue,
  );
  hbs.registerHelper('concat', (...args) => {
    args.pop(); // Remove the options object
    return args.join('');
  });
  hbs.registerHelper('formatDate', (dateString) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  });
  hbs.registerHelper('truncate', (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  });

  // Configure static assets serving using express.static
  app.use(express.static(join(process.cwd(), 'public')));
  app.use(express.static(join(process.cwd(), 'dist', 'client')));

  // Get SeederService instance from the application context
  const seederService = app.get(SeederService);

  // Re-enable seeding
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

  // IMPORTANT: Ensure NestJS routes are processed BEFORE the catch-all for React app
  // The order of app.use and app.setGlobalPrefix matters.
  // If you have controllers with specific routes, they should be handled by NestJS.
  // The `app.use('*', ...)` should be the very last route handler.

  logger.log('Attempting to listen on port...');
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
