// Sample MCP Tutorial Seed Data
import { SeedMCPTutorial } from './seed.interface'; // Assuming a common interface file

export interface SeedMCPTutorial { // Renaming to avoid conflict
    title: string;
    summary: string;
    imageUrl?: string;
    externalTutorialUrl?: string;
    publishDate?: Date;
    viewCount?: number;
    tags?: string[];
}

export const mcptutorialsSeed: SeedMCPTutorial[] = [
    {
        title: "用cursor、trae等客户端快速配置\"AI 私人厨师\" HowToCook-MCP Server",
        summary: "AIbase要为你介绍的就是一款炙手可热的 MCP 应用 ——HowToCook-MCP Server。这款应用将 AI 技术与美食制作巧妙结合...",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/info/c19e075a204e4a86acdc525594768463.jpg",
        externalTutorialUrl: "https://mcp.aibase.cn/server/doc/1922908213105807361",
        publishDate: new Date("2025-05-15T14:53:38Z"), // Note: Original site has future dates
        viewCount: 364,
        tags: ["MCP配置", "Cursor", "Trae", "HowToCook"]
    },
    {
        title: "OpenMemory MCP发布！AI记忆本地共享，Claude、Cursor一键同步效率翻倍！",
        summary: "OpenMemory MCP（Model Context Protocol）正式推出，为AI工具提供统一的本地记忆共享解决方案...",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/info/87f812e309254372859a1538d0bdb37e.jpg",
        externalTutorialUrl: "https://mcp.aibase.cn/server/doc/1922860088286662658",
        publishDate: new Date("2025-05-15T11:42:24Z"), // Note: Original site has future dates
        viewCount: 186,
        tags: ["OpenMemory", "AI记忆", "Claude", "Cursor"]
    },
    {
        title: "英语学习永动机？手把手教你用纳米AI调用MCP自动生成带MP3的精美双语网页",
        summary: "纳米AI的智能体为英语学习者和教育者带来了革命性的工具。本教程将详细指导您如何利用纳米AI的智能体...",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/info/09b25ed1e8154f3488ed36aae87946df.jpg",
        externalTutorialUrl: "https://mcp.aibase.cn/server/doc/1920733777552465921",
        publishDate: new Date("2025-05-09T14:53:12Z"), // Note: Original site has future dates
        viewCount: 117,
        tags: ["英语学习", "纳米AI", "MCP教程", "MP3生成"]
    },
    {
        title: "用Trae配置Bing MCP：高效搜索必应丰富的网页内容资源",
        summary: "Bing MCP 不仅是一个搜索工具，它更像是你的私人智能助手。它通过深度学习与中文语义的结合...",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/info/23a4e3f9914a477998261a16009b655c.png",
        externalTutorialUrl: "https://mcp.aibase.cn/server/doc/1920408030988185602",
        publishDate: new Date("2025-05-08T17:18:48Z"), // Note: Original site has future dates
        viewCount: 172,
        tags: ["Trae", "Bing MCP", "搜索配置"]
    }
];

// Common interface for seed data (optional, can be defined in each file or a central place)
// Moved to individual files to avoid import issues if not all seed files are created at once.
// export interface SeedMCPServce { ... }
// export interface SeedMCPTutorial { ... }
