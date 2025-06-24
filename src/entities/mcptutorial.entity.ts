// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema for MCP Tutorials.

export class MCPTutorialEntity {
  id: string; // MongoDB uses string IDs
  title: string;
  summary: string; // Short summary/excerpt shown on the card

  imageUrl?: string; // URL for the tutorial's image

  // Link to the actual tutorial page on the original site, or our own detail page
  externalTutorialUrl?: string;
  // internalDetailPageSlug?: string; // If we build detail pages on our clone

  publishDate?: Date; // Publication date
  viewCount?: number;

  tags?: string[]; // Optional tags for categorization

  // Timestamps
  createdAt: Date; // When this entry was created in our DB
  updatedAt: Date; // When this entry was last updated in our DB
}
