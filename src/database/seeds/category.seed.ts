// Sample Category Seed Data
// Note: For parentCategorySlug, ensure the parent is defined earlier in this array or handle order in seeder service.

import { SeedCategory } from './seed.interface';

export const categoriesSeed: SeedCategory[] = [
    // Top Level Categories
    { name: "AI绘画", slug: "ai-huihua", description: "AI-powered image generation and editing tools.", displayOrder: 1, isFeatured: true },
    { name: "AI写作", slug: "ai-xiezuo", description: "Tools for AI-assisted writing, content generation, and editing.", displayOrder: 2, isFeatured: true },
    { name: "AI视频", slug: "ai-shipin", description: "AI tools for video generation, editing, and analysis.", displayOrder: 3 },
    { name: "AI办公", slug: "ai-bangong", description: "Productivity tools enhanced with AI capabilities for office tasks.", displayOrder: 4 },
    { name: "AI聊天", slug: "ai-liaotian", description: "Chatbots and conversational AI platforms.", displayOrder: 5 },
    { name: "AI编程", slug: "ai-biancheng", description: "Tools for AI-assisted code generation and software development.", displayOrder: 6 },
    { name: "AI音频", slug: "ai-yinpin", description: "AI tools for audio generation, editing, and voice synthesis.", displayOrder: 7 },
    { name: "AI提示词", slug: "ai-tishici", description: "Resources and tools for crafting effective AI prompts.", displayOrder: 8 },
    { name: "AI设计", slug: "ai-sheji", description: "AI tools for graphic design, UI/UX, and creative asset generation.", displayOrder: 9 },
    { name: "AI数字人", slug: "ai-shuziren", description: "Platforms for creating and interacting with digital humans/avatars.", displayOrder: 10 },
    { name: "AI插件", slug: "ai-chajian", description: "Plugins and extensions that add AI capabilities to existing software.", displayOrder: 11 },
    { name: "法律助手", slug: "falv-zhushou", description: "AI tools for legal research, document analysis, and assistance.", displayOrder: 12 },

    // Sub-categories for AI绘画
    { name: "图片清晰放大修复", slug: "tupian-qingxi-fangda-xiufu", parentCategorySlug: "ai-huihua", displayOrder: 1 },
    { name: "抠图背景去除", slug: "koutu-beijing-quchu", parentCategorySlug: "ai-huihua", displayOrder: 2 },
    { name: "电商图片生成", slug: "dianshang-tupian-shengcheng", parentCategorySlug: "ai-huihua", displayOrder: 3 },
    { name: "LOGO图标生成", slug: "logo-tubiao-shengcheng", parentCategorySlug: "ai-huihua", displayOrder: 4 },

    // Sub-categories for AI写作
    { name: "AI论文", slug: "ai-lunwen", parentCategorySlug: "ai-xiezuo", displayOrder: 1 },
    { name: "AI内容检测", slug: "ai-neirong-jiance", parentCategorySlug: "ai-xiezuo", displayOrder: 2 },

    // Add more sub-categories as needed for other main categories
];
