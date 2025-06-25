// src/api/faqitems/faqitems.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQItem } from '../../schemas/faqitem.schema';
import { FAQItemEntity } from '../../entities/faqitem.entity';

@Injectable()
export class FAQItemsService {
  constructor(@InjectModel(FAQItem.name) private faqItemModel: Model<FAQItem>) {}

  async findAll(category?: string): Promise<FAQItemEntity[]> {
    const query = category ? { category: category } : {};
    return this.faqItemModel.find(query).sort({ displayOrder: 1 }).exec();
  }

  // Basic CRUD if needed later
  async create(createFAQItemDto: Partial<FAQItemEntity>): Promise<FAQItemEntity> {
    const newFAQItem = new this.faqItemModel(createFAQItemDto);
    return newFAQItem.save();
  }

  async findOne(id: string): Promise<FAQItemEntity> {
    return this.faqItemModel.findById(id).exec();
  }

  async update(id: string, updateFAQItemDto: Partial<FAQItemEntity>): Promise<FAQItemEntity> {
    return this.faqItemModel.findByIdAndUpdate(id, updateFAQItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<FAQItemEntity> {
    return this.faqItemModel.findByIdAndDelete(id).exec();
  }
}
