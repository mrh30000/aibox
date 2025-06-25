// src/database/seeds/infocard.seed.ts
import { InfoCardEntity } from '../../entities/infocard.entity'; // Assuming path is correct

// Define an interface or use Partial<InfoCardEntity> for seed data structure
export interface SeedInfoCard extends Partial<InfoCardEntity> {
    title: string;
    description: string;
    targetAudience: string;
    displayOrder: number;
    linkUrl?: string;
    isComingSoon?: boolean;
}

export const infocardsSeed: SeedInfoCard[] = [
    {
        title: "AIbase MCP 实验场",
        description: "在线访问使用 AIbase 平台托管的各类 MCP Server",
        isComingSoon: true,
        linkUrl: "#", // Placeholder link
        displayOrder: 1,
        targetAudience: "mcpPage"
    },
    {
        title: "MCP Inspector",
        description: "使用 MCP 官方测试通在线测试的 MCP Server",
        linkUrl: "/mcp/inspector", // Placeholder internal link
        isComingSoon: false,
        displayOrder: 2,
        targetAudience: "mcpPage"
    },
    {
        title: "AIbase MCP 教程与实践",
        description: "了解和学习 MCP，观看和改造最佳实践",
        linkUrl: "/mcp/tutorials", // Placeholder internal link, could map to a page listing tutorials
        isComingSoon: false,
        displayOrder: 3,
        targetAudience: "mcpPage"
    },
    {
        title: "MCP 客户端使用攻略",
        description: "掌握 MCP 客户端的配置与使用技巧，提升开发效率",
        linkUrl: "/mcp/client-guides", // Placeholder internal link
        isComingSoon: false,
        displayOrder: 4,
        targetAudience: "mcpPage"
    }
];
