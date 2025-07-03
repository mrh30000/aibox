// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema for MCP Tutorials.

import { Document } from 'mongoose';

export interface MCPTutorialEntity extends Document {
  title: string;
  summary: string; // Short summary/excerpt shown on the card

  imageUrl?: string; // URL for the tutorial's image

  // Link to the actual tutorial page on the original site, or our own detail page
  externalTutorialUrl?: string;
  // internalDetailPageSlug?: string; // If we build detail pages on our clone

  publishDate?: Date; // Publication date
  viewCount?: number;

  tags?: string[]; // Optional tags for categorization

  // Timestamps are handled by Mongoose Document
}
