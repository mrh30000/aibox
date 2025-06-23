// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema.

export class NewsEntity {
  id: string; // MongoDB uses string IDs
  title: string;
  excerpt: string; // Short summary of the news
  content: string; // Full content, likely HTML or Markdown
  imageUrl?: string; // URL for the main image of the news article

  category: string; // This might become a CategoryEntity relation later
  tags?: string[];

  author?: string; // Name of the author or source
  sourceUrl?: string; // Link to the original article if aggregated

  publishedAt: Date; // Date when the news was published

  isFeatured?: boolean; // To mark news for prominent display

  // Engagement metrics - these might be updated frequently
  views?: number;
  // likes?: number; // Simplified for now, can add later if needed

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
