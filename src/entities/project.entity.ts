// Using a class for structure, Mongoose schema will be defined separately.
// This entity will guide the Mongoose schema.

import { Document } from 'mongoose';

export interface ProjectEntity extends Document {
  name: string; // Name of the project
  description: string; // Short description
  longDescription?: string; // More detailed description of the project

  // Project repository and links
  projectUrl?: string; // Link to the project's own website or landing page
  repositoryUrl?: string; // e.g., GitHub, GitLab link
  demoUrl?: string; // Link to a live demo if available

  // Categorization and metadata
  category: string; // Main category, might become a CategoryEntity relation
  tags?: string[]; // Keywords for discoverability
  status?: 'active' | 'archived' | 'in-development'; // Current status of the project
  license?: string; // e.g., MIT, Apache 2.0

  // Visuals
  imageUrl?: string; // URL for a primary image or logo for the project
  screenshots?: string[]; // URLs of screenshots showcasing the project

  // Technical details
  programmingLanguages?: string[]; // e.g., ['Python', 'TypeScript']
  technologiesUsed?: string[]; // e.g., ['NestJS', 'React', 'MongoDB']

  // Community / Stats (can be dynamic or periodically updated)
  stars?: number; // e.g., GitHub stars
  forks?: number; // e.g., GitHub forks
  contributors?: number;
  lastCommitDate?: Date;

  isFeatured?: boolean; // For highlighting specific projects

  // Timestamps
  // createdAt and updatedAt are handled by Mongoose Document
  projectCreatedAt?: Date; // Original creation date of the project itself, if known
  projectUpdatedAt?: Date; // Last update date of the project itself, if known
}
