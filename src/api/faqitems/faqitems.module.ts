// src/api/faqitems/faqitems.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQItemsService } from './faqitems.service';
import { FAQItem, FAQItemSchema } from '../../schemas/faqitem.schema';
// No controller for now, service to be used by MCPPageController

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FAQItem.name, schema: FAQItemSchema }]),
  ],
  providers: [FAQItemsService],
  exports: [FAQItemsService],
})
export class FAQItemsModule {}
