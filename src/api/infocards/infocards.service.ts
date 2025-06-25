// src/api/infocards/infocards.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfoCard } from '../../schemas/infocard.schema';
import { InfoCardEntity } from '../../entities/infocard.entity';

@Injectable()
export class InfoCardsService {
  constructor(@InjectModel(InfoCard.name) private infoCardModel: Model<InfoCard>) {}

  async findAll(targetAudience?: string): Promise<InfoCardEntity[]> {
    const query = targetAudience ? { targetAudience: targetAudience } : {};
    return this.infoCardModel.find(query).sort({ displayOrder: 1 }).exec();
  }

  // Basic CRUD if needed later for an admin panel
  async create(createInfoCardDto: Partial<InfoCardEntity>): Promise<InfoCardEntity> {
    const newInfoCard = new this.infoCardModel(createInfoCardDto);
    return newInfoCard.save();
  }

  async findOne(id: string): Promise<InfoCardEntity> {
    return this.infoCardModel.findById(id).exec();
  }

  async update(id: string, updateInfoCardDto: Partial<InfoCardEntity>): Promise<InfoCardEntity> {
    return this.infoCardModel.findByIdAndUpdate(id, updateInfoCardDto, { new: true }).exec();
  }

  async remove(id: string): Promise<InfoCardEntity> {
    return this.infoCardModel.findByIdAndDelete(id).exec();
  }
}
