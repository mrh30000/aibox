import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../../schemas/news.schema';
import { NewsEntity } from '../../entities/news.entity'; // For DTOs or type hints

export class CreateNewsDto {
    title: string;
    excerpt: string;
    content: string;
    category: string; // Later, this could be Category ID
    publishedAt: Date;
    imageUrl?: string;
    tags?: string[];
    author?: string;
    sourceUrl?: string;
    isFeatured?: boolean;
    views?: number;
}

export class UpdateNewsDto extends CreateNewsDto {}

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const newNews = new this.newsModel(createNewsDto);
    return newNews.save();
  }

  async findAll(): Promise<NewsEntity[]> {
    return this.newsModel.find().sort({ publishedAt: -1 }).exec(); // Sort by newest
  }

  async findOne(id: string): Promise<NewsEntity> {
    const newsItem = await this.newsModel.findById(id).exec();
    if (!newsItem) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return newsItem;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    const updatedNews = await this.newsModel.findByIdAndUpdate(id, updateNewsDto, { new: true }).exec();
    if (!updatedNews) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return updatedNews;
  }

  async remove(id: string): Promise<NewsEntity> {
    const deletedNews = await this.newsModel.findByIdAndDelete(id).exec();
    if (!deletedNews) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return deletedNews;
  }
}
