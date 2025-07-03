// src/entities/faqitem.entity.ts

import { Document } from 'mongoose';

export interface FAQItemEntity extends Document {
  question: string;
  answer: string; // Can contain HTML
  displayOrder: number;
  category?: string; // e.g., 'mcpGeneral', 'billing', 'technical' - for grouping FAQs
  // Timestamps are handled by Mongoose Document
}
