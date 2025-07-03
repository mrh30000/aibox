// src/api/infocards/infocards.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfoCard } from '../../schemas/infocard.schema';
import { InfoCardEntity } from '../../entities/infocard.entity';

@Injectable()
export class InfoCardsService {
  constructor(@InjectModel(InfoCard.name) private infoCardModel: Model<InfoCard>) {}

  async findAll(targetAudience?: string): Promise<InfoCardEntity[]> {
    const query = targetAudience ? { targetAudience: targetAudience } : {};
    const infoCards = await this.infoCardModel.find(query).sort({ displayOrder: 1 }).exec();
    return infoCards.map(card => card.toObject({ getters: true, virtuals: true }));
  }

  // Basic CRUD if needed later for an admin panel
  async create(createInfoCardDto: Partial<InfoCardEntity>): Promise<InfoCardEntity> {
    const newInfoCard = new this.infoCardModel(createInfoCardDto);
    const savedInfoCard = await newInfoCard.save();
    return savedInfoCard.toObject({ getters: true, virtuals: true });
  }

  async findOne(id: string): Promise<InfoCardEntity> {
    const infoCard = await this.infoCardModel.findById(id).exec();
    if (!infoCard) {
      throw new NotFoundException(`InfoCard with ID "${id}" not found`);
    }
    return infoCard.toObject({ getters: true, virtuals: true });
  }

  async update(id: string, updateInfoCardDto: Partial<InfoCardEntity>): Promise<InfoCardEntity> {
    const updatedInfoCard = await this.infoCardModel.findByIdAndUpdate(id, updateInfoCardDto, { new: true }).exec();
    if (!updatedInfoCard) {
      throw new NotFoundException(`InfoCard with ID "${id}" not found`);
    }
    return updatedInfoCard.toObject({ getters: true, virtuals: true });
  }

  async remove(id: string): Promise<InfoCardEntity> {
    const deletedInfoCard = await this.infoCardModel.findByIdAndDelete(id).exec();
    if (!deletedInfoCard) {
      throw new NotFoundException(`InfoCard with ID "${id}" not found`);
    }
    return deletedInfoCard.toObject({ getters: true, virtuals: true });
  }
}
