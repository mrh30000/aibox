// src/entities/infocard.entity.ts

export class InfoCardEntity {
  id: string; // MongoDB uses string IDs
  title: string;
  description: string;
  linkUrl?: string; // Optional, as one card is "Coming soon"
  isComingSoon?: boolean;
  displayOrder: number; // To control the order of cards
  targetAudience: string; // e.g., 'mcpPage', 'homePage', to filter cards for specific pages

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
