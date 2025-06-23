// Sample Tool Seed Data

export interface SeedTool {
    name: string;
    description: string;
    categorySlug: string; // Slug of the category this tool belongs to
    websiteUrl: string;
    language: 'zh' | 'en' | 'other';
    iconUrl?: string;
    imageUrl?: string;
    longDescription?: string;
    subCategorySlug?: string; // Slug of the sub-category
    tags?: string[];
    rating?: number;
    isFeatured?: boolean;
    hasFreeTrial?: boolean;
    isFreemium?: boolean;
    pricingModel?: 'subscription' | 'one-time' | 'usage-based' | 'free' | 'contact_us';
    pricingDetails?: string;
    developer?: string;
    useCases?: string[];
    features?: string[];
    publishedAt?: Date;
}

export const toolsSeed: SeedTool[] = [
    {
        name: "灵码 IDE",
        description: "智能编码助手，提供高效、智能的编程体验。",
        categorySlug: "ai-biancheng", // Main category slug
        websiteUrl: "https://lingma.aliyun.com/",
        language: "zh",
        isFeatured: true,
        iconUrl: "https://img.aibase.com/static/app/10325.png?imageView2/1/w/120/h/120/q/75",
        publishedAt: new Date("2023-10-01T10:00:00Z"),
        tags: ["IDE", "coding assistant", "developer tools"],
        pricingModel: "free", // Assuming, check actual
    },
    {
        name: "Claude 4",
        description: "全球最强的编程和推理模型，提升开发效率。",
        categorySlug: "ai-biancheng",
        websiteUrl: "https://www.anthropic.com/claude",
        language: "en",
        isFeatured: true,
        iconUrl: "https://img.aibase.com/static/app/10320.png?imageView2/1/w/120/h/120/q/75",
        publishedAt: new Date("2023-09-15T10:00:00Z"),
        tags: ["LLM", "reasoning", "coding"],
        pricingModel: "contact_us", // Example
    },
    {
        name: "Migo AI文献阅读助手",
        description: "智能伴读工具，支持文献阅读与思维导图生成。",
        categorySlug: "ai-xiezuo", // Belongs to AI写作
        subCategorySlug: "ai-lunwen", // Sub-category AI论文
        websiteUrl: "https://migo.intern-ai.org.cn/",
        language: "zh",
        isFeatured: true,
        iconUrl: "https://img.aibase.com/static/app/10319.png?imageView2/1/w/120/h/120/q/75",
        publishedAt: new Date("2023-08-20T10:00:00Z"),
        tags: ["research", "literature review", "mind map"],
        pricingModel: "freemium",
    },
    {
        name: "Midjourney",
        description: "领先的AI图像生成器，通过文本提示创作独特艺术作品。",
        categorySlug: "ai-huihua",
        subCategorySlug: "logo-tubiao-shengcheng", // Example if it fits
        websiteUrl: "https://www.midjourney.com/",
        language: "en",
        isFeatured: true,
        iconUrl: "https://img.aibase.com/static/app/10001.png?imageView2/1/w/120/h/120/q/75", // Example icon
        publishedAt: new Date("2023-03-10T10:00:00Z"),
        tags: ["image generation", "art", "creative"],
        pricingModel: "subscription",
        features: ["High-quality image output", "Artistic styles", "Discord bot interface"],
        rating: 4.8,
    },
    {
        name: "Runway Gen-2",
        description: "通过文本或图片生成视频的AI模型。",
        categorySlug: "ai-shipin",
        websiteUrl: "https://runwayml.com/gen-2/",
        language: "en",
        isFeatured: false,
        iconUrl: "https://img.aibase.com/static/app/10018.png?imageView2/1/w/120/h/120/q/75", // Example icon
        publishedAt: new Date("2023-06-01T10:00:00Z"),
        tags: ["video generation", "text-to-video", "image-to-video"],
        pricingModel: "subscription",
        rating: 4.5,
    },
    // Add more tools as needed
];
