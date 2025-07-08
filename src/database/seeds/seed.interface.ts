// Centralized interfaces for seed data structures (optional)

export interface SeedMCPServce {
  name: string;
  description: string;
  languageOrTech?: string;
  userCountOrStars?: number;
  rating?: number;
  isVerified?: boolean;
  externalServiceUrl?: string;
  imageUrl?: string;
  tags?: string[];
  addedToPlatformAt?: Date;
  longDescription?: string; // Added from mcpservice.entity.ts
}

export interface SeedMCPTutorial {
  title: string;
  summary: string;
  imageUrl?: string;
  externalTutorialUrl?: string;
  publishDate?: Date;
  viewCount?: number;
  tags?: string[];
}

// Interface for Category seed data if needed directly by other seeders, though usually handled by seeder service.
export interface SeedCategory {
  name: string;
  slug: string; // Slug is now required, will be generated if not provided in seed data
  description?: string;
  parentCategorySlug?: string;
  iconUrl?: string;
  imageUrl?: string;
  displayOrder?: number;
  isFeatured?: boolean;
}
