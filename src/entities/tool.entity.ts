// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema.

import { Document } from 'mongoose';

export interface ToolEntity extends Document {
  name: string;
  description: string;
  longDescription?: string; // For more detailed descriptions
  category: string; // This might become a CategoryEntity relation later
  subCategory?: string; // e.g. "图片清晰放大修复" under "AI绘画"
  iconUrl?: string; // URL for the tool's icon
  imageUrl?: string; // URL for a larger promotional image
  websiteUrl: string;
  tags?: string[];
  language: 'zh' | 'en' | 'other'; // Based on website (e.g. "灵码 IDE" is zh)

  // Fields from the "最新推荐" section of aibase.com/zh/tools
  // Some of these might be derived or managed differently with MongoDB
  // visitors?: string; // e.g., "2.5k" - might be dynamic
  // change?: string; // e.g., "+500" - might be dynamic
  rating?: number; // e.g. 4.5

  isFeatured?: boolean; // To mark tools for "热门推荐" sections

  // Pricing info - simplified for now, can be expanded
  hasFreeTrial?: boolean;
  isFreemium?: boolean;
  pricingModel?:
    | 'subscription'
    | 'one-time'
    | 'usage-based'
    | 'free'
    | 'contact_us'
    | 'freemium';
  pricingDetails?: string; // Text description of pricing if complex

  // Additional useful fields
  developer?: string;
  useCases?: string[]; // What is this tool good for?
  features?: string[]; // Key features

  // Timestamps are handled by Mongoose Document
  publishedAt?: Date; // When the tool was made public on the platform
}
