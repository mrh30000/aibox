import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema'; // Mongoose model class
import { NewsEntity } from './entities/news.entity'; // Interface for type hints
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const newNews = new this.newsModel(createNewsDto);
    return newNews.save() as Promise<NewsEntity>;
  }

  async findAll(
    category?: string,
    isFeatured?: boolean,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: NewsEntity[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    const queryConditions: any = {};

    if (category) {
      queryConditions.category = category;
    }
    if (isFeatured !== undefined) {
      queryConditions.isFeatured = isFeatured;
    }

    const [data, total] = await Promise.all([
      this.newsModel.find(queryConditions)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec() as Promise<NewsEntity[]>,
      this.newsModel.countDocuments(queryConditions).exec(),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<NewsEntity> {
    const newsItem = await this.newsModel.findById(id).exec();
    if (!newsItem) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return newsItem as NewsEntity;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    const updatedNews = await this.newsModel.findByIdAndUpdate(id, updateNewsDto, { new: true }).exec();
    if (!updatedNews) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return updatedNews as NewsEntity;
  }

  async remove(id: string): Promise<NewsEntity> {
    const deletedNews = await this.newsModel.findByIdAndDelete(id).exec();
    if (!deletedNews) {
      throw new NotFoundException(`News with ID "${id}" not found`);
    }
    return deletedNews as NewsEntity;
  }
}
