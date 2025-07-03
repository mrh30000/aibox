// src/entities/infocard.entity.ts

import { Document } from 'mongoose';

export interface InfoCardEntity extends Document {
  title: string;
  description: string;
  linkUrl?: string; // Optional, as one card is "Coming soon"
  isComingSoon?: boolean;
  displayOrder: number; // To control the order of cards
  targetAudience: string; // e.g., 'mcpPage', 'homePage', to filter cards for specific pages
  // Timestamps are handled by Mongoose Document
}
