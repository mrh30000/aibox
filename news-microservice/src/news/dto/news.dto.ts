import { NewsEntity } from '../entities/news.entity'; // Adjust path as entity will be local

// DTO for creating news
export class CreateNewsDto {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    publishedAt: Date;
    imageUrl?: string;
    tags?: string[];
    author?: string;
    sourceUrl?: string;
    isFeatured?: boolean;
    views?: number;
}

// DTO for updating news
export class UpdateNewsDto extends CreateNewsDto {}

// DTO for individual news items tailored for NewsPage.tsx
export class NewsItemDto {
  id: string; // MongoDB IDs are strings
  title: string;
  date: string; // Will be formatted string from Date
  category?: string;
  image?: string;
  excerpt?: string;
  views?: number;
}

// DTO for the /api/news-page-data endpoint response
export class NewsPageDataDto {
  newsItems: NewsItemDto[];
  recommendedTools: { id: number; name: string; description: string; icon: string; }[];
  popularTopics: { id: string; name: string; }[];
}
