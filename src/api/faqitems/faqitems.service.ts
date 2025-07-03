// src/api/faqitems/faqitems.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQItem } from '../../schemas/faqitem.schema';
import { FAQItemEntity } from '../../entities/faqitem.entity';

@Injectable()
export class FAQItemsService {
  constructor(@InjectModel(FAQItem.name) private faqItemModel: Model<FAQItem>) {}

  async findAll(category?: string): Promise<FAQItemEntity[]> {
    const query = category ? { category: category } : {};
    const faqItems = await this.faqItemModel.find(query).sort({ displayOrder: 1 }).exec();
    return faqItems.map(item => item.toObject({ getters: true, virtuals: true }));
  }

  // Basic CRUD if needed later
  async create(createFAQItemDto: Partial<FAQItemEntity>): Promise<FAQItemEntity> {
    const newFAQItem = new this.faqItemModel(createFAQItemDto);
    const savedFAQItem = await newFAQItem.save();
    return savedFAQItem.toObject({ getters: true, virtuals: true });
  }

  async findOne(id: string): Promise<FAQItemEntity> {
    const faqItem = await this.faqItemModel.findById(id).exec();
    if (!faqItem) {
      throw new NotFoundException(`FAQItem with ID "${id}" not found`);
    }
    return faqItem.toObject({ getters: true, virtuals: true });
  }

  async update(id: string, updateFAQItemDto: Partial<FAQItemEntity>): Promise<FAQItemEntity> {
    const updatedFAQItem = await this.faqItemModel.findByIdAndUpdate(id, updateFAQItemDto, { new: true }).exec();
    if (!updatedFAQItem) {
      throw new NotFoundException(`FAQItem with ID "${id}" not found`);
    }
    return updatedFAQItem.toObject({ getters: true, virtuals: true });
  }

  async remove(id: string): Promise<FAQItemEntity> {
    const deletedFAQItem = await this.faqItemModel.findByIdAndDelete(id).exec();
    if (!deletedFAQItem) {
      throw new NotFoundException(`FAQItem with ID "${id}" not found`);
    }
    return deletedFAQItem.toObject({ getters: true, virtuals: true });
  }
}
