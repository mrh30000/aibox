import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { SeederService } from './database/seeder.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Configure Handlebars template engine
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(process.cwd(), 'views', 'partials'));

  // Register Handlebars helpers
  hbs.registerHelper('eq', (a: any, b: any): boolean => a === b);
  hbs.registerHelper('ne', (a: any, b: any): boolean => a !== b);
  hbs.registerHelper('json', (context: any): string => JSON.stringify(context));
  hbs.registerHelper('gt', (a: any, b: any): boolean => a > b);
  hbs.registerHelper('lt', (a: any, b: any): boolean => a < b);
  hbs.registerHelper('add', (a: any, b: any): number => a + b);
  hbs.registerHelper('subtract', (a: any, b: any): number => a - b);
  hbs.registerHelper('multiply', (a: any, b: any): number => a * b);
  hbs.registerHelper('divide', (a: any, b: any): number => a / b);
  hbs.registerHelper('mod', (a: any, b: any): number => a % b);
  hbs.registerHelper('and', (a: any, b: any): boolean => a && b);
  hbs.registerHelper('or', (a: any, b: any): boolean => a || b);
  hbs.registerHelper('not', (a: any): boolean => !a);
  hbs.registerHelper(
    'ternary',
    (condition: any, trueValue: any, falseValue: any): any =>
      condition ? trueValue : falseValue,
  );
  hbs.registerHelper('concat', (...args: string[]): string => {
    args.pop(); // Remove the options object
    return args.join('');
  });
  hbs.registerHelper('formatDate', (dateString: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  });
  hbs.registerHelper('truncate', (text: string, length: number): string => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  });

  // Configure static assets serving
  app.useStaticAssets(join(process.cwd(), 'dist', 'client'));

  // Get SeederService instance from the application context
  const seederService = app.get(SeederService);

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.SEED_DB === 'true'
  ) {
    logger.log(
      'Development environment detected or SEED_DB is true. Attempting to run seeders...',
    );
    try {
      await seederService.seedAll();
      logger.log('Seeding process completed successfully via bootstrap.');
    } catch (error) {
      logger.error('Error during database seeding:', error);
    }
  } else {
    logger.log(
      'Skipping automatic seeding (NODE_ENV is not "development" or SEED_DB is not "true").',
    );
  }

  logger.log('Attempting to listen on port...');
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
