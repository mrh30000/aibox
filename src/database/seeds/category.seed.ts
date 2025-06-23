// Sample Category Seed Data
// Note: For parentCategorySlug, ensure the parent is defined earlier in this array or handle order in seeder service.

export interface SeedCategory {
    name: string;
    description?: string;
    parentCategorySlug?: string; // Slug of the parent category
    iconUrl?: string;
    imageUrl?: string;
    displayOrder?: number;
    isFeatured?: boolean;
    // slug will be auto-generated in seeder service
}

export const categoriesSeed: SeedCategory[] = [
    // Top Level Categories
    { name: "AI绘画", description: "AI-powered image generation and editing tools.", displayOrder: 1, isFeatured: true },
    { name: "AI写作", description: "Tools for AI-assisted writing, content generation, and editing.", displayOrder: 2, isFeatured: true },
    { name: "AI视频", description: "AI tools for video generation, editing, and analysis.", displayOrder: 3 },
    { name: "AI办公", description: "Productivity tools enhanced with AI capabilities for office tasks.", displayOrder: 4 },
    { name: "AI聊天", description: "Chatbots and conversational AI platforms.", displayOrder: 5 },
    { name: "AI编程", description: "Tools for AI-assisted code generation and software development.", displayOrder: 6 },
    { name: "AI音频", description: "AI tools for audio generation, editing, and voice synthesis.", displayOrder: 7 },
    { name: "AI提示词", description: "Resources and tools for crafting effective AI prompts.", displayOrder: 8 },
    { name: "AI设计", description: "AI tools for graphic design, UI/UX, and creative asset generation.", displayOrder: 9 },
    { name: "AI数字人", description: "Platforms for creating and interacting with digital humans/avatars.", displayOrder: 10 },
    { name: "AI插件", description: "Plugins and extensions that add AI capabilities to existing software.", displayOrder: 11 },
    { name: "法律助手", description: "AI tools for legal research, document analysis, and assistance.", displayOrder: 12 },

    // Sub-categories for AI绘画
    { name: "图片清晰放大修复", parentCategorySlug: "ai-huihua", displayOrder: 1 },
    { name: "抠图背景去除", parentCategorySlug: "ai-huihua", displayOrder: 2 },
    { name: "电商图片生成", parentCategorySlug: "ai-huihua", displayOrder: 3 },
    { name: "LOGO图标生成", parentCategorySlug: "ai-huihua", displayOrder: 4 },

    // Sub-categories for AI写作
    { name: "AI论文", parentCategorySlug: "ai-xiezuo", displayOrder: 1 },
    { name: "AI内容检测", parentCategorySlug: "ai-xiezuo", displayOrder: 2 },

    // Add more sub-categories as needed for other main categories
];
