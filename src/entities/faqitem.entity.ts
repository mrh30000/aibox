// src/entities/faqitem.entity.ts

export class FAQItemEntity {
  id: string; // MongoDB uses string IDs
  question: string;
  answer: string; // Can contain HTML
  displayOrder: number;
  category?: string; // e.g., 'mcpGeneral', 'billing', 'technical' - for grouping FAQs

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
