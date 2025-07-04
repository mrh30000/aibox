import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001; // Default port for the microservice
  await app.listen(port);
  Logger.log(`🚀 News Microservice running on port ${port}`, 'Bootstrap');
}
bootstrap();
