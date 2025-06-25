// src/api/infocards/infocards.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoCardsService } from './infocards.service';
import { InfoCard, InfoCardSchema } from '../../schemas/infocard.schema';
// No controller is defined here as it's assumed to be used internally by MCPPageController for now.
// If direct API access to InfoCards is needed, a controller would be added.

@Module({
  imports: [MongooseModule.forFeature([{ name: InfoCard.name, schema: InfoCardSchema }])],
  providers: [InfoCardsService],
  exports: [InfoCardsService], // Export service for injection into other modules (e.g., MCPPageController's module)
})
export class InfoCardsModule {}
