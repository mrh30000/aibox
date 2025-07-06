import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { databaseConfig } from './config/database.config'; // Import database config

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri), // Configure Mongoose
    NewsModule, // Import the NewsModule
  ],
  controllers: [AppController], // AppController for health check
  providers: [AppService],
})
export class AppModule {}
