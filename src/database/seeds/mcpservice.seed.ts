// Sample MCP Service Seed Data
import { SeedMCPServce } from './seed.interface';

export const mcpservicesSeed: SeedMCPServce[] = [
    {
        name: "Figma Context MCP",
        description: "Framelink Figma MCP Server是一个为AI编程工具（如Cursor）提供Figma设计数据访问的服务器...",
        languageOrTech: "TypeScript",
        userCountOrStars: 6676,
        rating: 4.5,
        isVerified: false,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916343928028372994",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/842883.jpg",
        tags: ["开发效率工具", "聊天机器人"], // Example tags
        addedToPlatformAt: new Date("2024-07-01T10:00:00Z")
    },
    {
        name: "Duckduckgo MCP Server",
        description: "DuckDuckGo搜索MCP服务器，为Claude等LLM提供网页搜索和内容抓取服务",
        languageOrTech: "Python",
        userCountOrStars: 863,
        rating: 4.3,
        isVerified: true,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916334356153921537",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/9121162.jpg",
        tags: ["开发效率工具", "智能搜索"],
        addedToPlatformAt: new Date("2024-07-02T10:00:00Z")
    },
    {
        name: "Firecrawl MCP Server",
        description: "Firecrawl MCP Server是一个集成Firecrawl网页抓取能力的模型上下文协议服务器...",
        languageOrTech: "TypeScript",
        userCountOrStars: 3929,
        rating: 5,
        isVerified: false,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916334356875341825",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/135057108.jpg",
        tags: ["开发效率工具", "数据管理"],
        addedToPlatformAt: new Date("2024-07-03T10:00:00Z")
    },
    {
        name: "Minimax MCP Server",
        description: "MiniMax Model Context Protocol (MCP) 是一个官方服务器，支持与强大的文本转语音、视频/图像生成API交互...",
        languageOrTech: "Python",
        userCountOrStars: 778,
        rating: 4.8,
        isVerified: false,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916343427429801986",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/194880281.jpg",
        tags: ["图像与视频处理"],
        addedToPlatformAt: new Date("2024-06-20T10:00:00Z")
    },
    {
        name: "Notte Browser",
        description: "Notte是一个开源的全栈网络AI代理框架，提供浏览器会话、自动化LLM驱动的代理...",
        languageOrTech: "TypeScript", // Assuming based on description, could be different
        userCountOrStars: 672,
        rating: 4.5,
        isVerified: true,
        externalServiceUrl: "https://mcp.aibase.cn/server/1920403738260664322",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/183074172.jpg",
        tags: ["浏览器自动化", "聊天机器人"],
        addedToPlatformAt: new Date("2024-06-25T10:00:00Z")
    },
    // Add 15-20 more based on the provided website text...
    {
        name: "Context7",
        description: "Context7 MCP是一个为AI编程助手提供实时、版本特定文档和代码示例的服务...",
        languageOrTech: "TypeScript",
        userCountOrStars: 5252,
        rating: 4.7,
        isVerified: false,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916344012916891650",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/74989412.jpg",
        tags: ["开发效率工具", "聊天机器人"],
        addedToPlatformAt: new Date("2024-06-15T10:00:00Z")
    },
     {
        name: "Baidu Map",
        description: "百度地图MCP Server是国内首个兼容MCP协议的地图服务...",
        languageOrTech: "Python",
        userCountOrStars: 741,
        rating: 4.5,
        isVerified: true,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916341213399326722",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/204146226.jpg",
        tags: ["智能搜索", "开发效率工具"], // Example, adjust as needed
        addedToPlatformAt: new Date("2024-07-04T10:00:00Z")
    },
    {
        name: "Exa Web Search",
        description: "Exa MCP Server是一个为AI助手（如Claude）提供网络搜索功能的服务器...",
        languageOrTech: "TypeScript",
        userCountOrStars: 1796,
        rating: 5,
        isVerified: true,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916332974701170689",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/77906174.jpg",
        tags: ["智能搜索", "数据管理"],
        addedToPlatformAt: new Date("2024-07-05T10:00:00Z")
    },
    {
        name: "MCP Playwright",
        description: "一个基于Playwright的MCP服务器，为LLM提供浏览器自动化能力",
        languageOrTech: "TypeScript",
        userCountOrStars: 3790,
        rating: 5,
        isVerified: false,
        externalServiceUrl: "https://mcp.aibase.cn/server/1916334421182410754",
        imageUrl: "https://img-1255512983.cos.ap-guangzhou.myqcloud.com/aibase/head/10337030.jpg",
        tags: ["浏览器自动化"],
        addedToPlatformAt: new Date("2024-06-10T10:00:00Z")
    }
];
