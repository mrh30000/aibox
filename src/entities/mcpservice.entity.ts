// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema for MCP Services.

import { Document } from 'mongoose';

export interface MCPServceEntity extends Document {
  name: string;
  description: string; // Short description shown on the card
  longDescription?: string; // Optional: For a detailed page view if we build one

  imageUrl?: string; // URL for the service's icon/image
  languageOrTech?: string; // e.g., "TypeScript", "Python", "Go"
  userCountOrStars?: number; // Representing the number like "6,676" - store as number
  rating?: number; // e.g., 4.5 (store as number)
  isVerified?: boolean; // For the "已认证" badge

  // Link to the actual service or its detail page on the original site, or our own detail page if we create one
  externalServiceUrl?: string;
  // If we build detail pages on our clone:
  // internalDetailPageSlug?: string;

  tags?: string[]; // For categories like "开发效率工具", "聊天机器人" etc.
  // These could also be references to a new MCPCategoryEntity if we need to manage these categories

  // Timestamps are handled by Mongoose Document
}
