import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tools')
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  icon: string;

  @Column({ type: 'varchar', length: 50 })
  visitors: string;

  @Column({ type: 'varchar', length: 20 })
  change: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  websiteUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  apiUrl: string;

  @Column({ type: 'json', nullable: true })
  pricing: {
    free: boolean;
    plans: Array<{
      name: string;
      price: number;
      features: string[];
    }>;
  };

  @Column({ type: 'json', nullable: true })
  stats: {
    totalUsers: string;
    satisfaction: string;
    avgRating: number;
    languages: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
