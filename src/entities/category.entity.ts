// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema.

import { Document } from 'mongoose';

export interface CategoryEntity extends Document {
  id?: string; // Make id optional, as it's a virtual property derived from _id
  name: string; // Name of the category (e.g., "AI绘画", "AI写作")
  slug: string; // URL-friendly slug (e.g., "ai-painting")
  description?: string; // Optional description for the category

  parentCategory?: string | CategoryEntity; // ID of the parent category, or populated CategoryEntity
                           // This allows for hierarchical categories.
                           // For top-level categories, this would be null or undefined.

  // Type of content this category applies to.
  // This helps in namespacing categories if "热门推荐" can exist for Tools, News, and Projects.
  // Or, categories could be global, and items are tagged.
  // For now, let's assume categories can be specific or general.
  // A more complex setup might use separate category collections per entity type
  // or a polymorphic association.
  // For simplicity, we can start with a general category and filter by type in services.
  // associatedEntityType?: 'Tool' | 'News' | 'Project' | 'General';

  iconUrl?: string; // Optional icon for the category
  imageUrl?: string; // Optional image representing the category

  displayOrder?: number; // For controlling the order in which categories are displayed

  isFeatured?: boolean; // To highlight certain categories

  // Timestamps are handled by Mongoose Document
}
