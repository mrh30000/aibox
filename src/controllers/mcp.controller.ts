import { Controller, Get, Render, Inject } from '@nestjs/common';
import { MCPServicesService } from '../api/mcpservices/mcpservices.service';
import { MCPTutorialsService } from '../api/mcptutorials/mcptutorials.service';
// Potentially a service to get FAQ data if it becomes dynamic
// import { FaqService } from '../api/faq/faq.service';

@Controller('mcp') // Base route for all MCP pages
export class MCPPageController {
  constructor(
    private readonly mcpServicesService: MCPServicesService,
    private readonly mcpTutorialsService: MCPTutorialsService,
    // @Inject(FaqService) private readonly faqService: FaqService // If FAQ is dynamic
  ) {}

  @Get()
  @Render('mcp-landing')
  async getMCPPage() {
    const featuredServices = await this.mcpServicesService.findFeatured(8);
    const recentServices = await this.mcpServicesService.findRecent(8);
    const tutorialsResult = await this.mcpTutorialsService.findAll(4); // Get 4 tutorials

    // Placeholder for categorized services. This would involve more complex logic:
    // 1. Get all unique tags/categories from MCP services.
    // 2. For each category, fetch a few services.
    // This is simplified for now.
    const exampleCategorizedServices = [
      {
        categoryName: "开发效率工具",
        categorySlug: "developer-tools", // for "View All" link
        services: await this.mcpServicesService.findAll("开发效率工具", 4, 1).then(res => res.data), // Assuming findAll can filter by tag
        hasMore: true // Logic to determine if there are more than 4 services in this category
      },
      {
        categoryName: "聊天机器人",
        categorySlug: "chatbots",
        services: await this.mcpServicesService.findAll("聊天机器人", 4, 1).then(res => res.data),
        hasMore: true
      },
      // Add more categories as needed
    ];

    // Placeholder for FAQ data
    const faqItems = [
      { question: "什么是MCP (Model Context Protocol)？", answer: "MCP（Model Context Protocol）是一种开放标准协议，允许AI模型与外部工具和服务进行交互。它为大型语言模型（LLMs）提供了一种标准化的方式来访问和操作外部数据、API和服务..." },
      { question: "如何在我的开发环境中设置MCP服务器？", answer: "设置MCP服务器通常需要以下步骤：1) 安装所需的MCP客户端...具体步骤可能因不同的MCP服务和客户端而略有不同。" },
      { question: "MCP与传统API调用有什么区别?", answer: "MCP与传统API调用的主要区别在于：1) MCP提供了一个统一的接口...5) MCP支持会话上下文..." },
      // Add more FAQs from the target site
    ];

    // Placeholder for Footer Data
    const footerData = {
        popularServices: [ // Example data, should be fetched or configured
            { name: "Figma Context MCP", url: "#"},
            { name: "Duckduckgo MCP Server", url: "#"},
        ],
        popularCategories: [ // Example, these should be actual categories from your system
            { name: "图像与视频处理", slug: "image-video-processing" },
            { name: "数据库", slug: "databases" },
        ],
        popularTags: [ // Example tags
            { name: "AI集成", slug: "ai-integration" },
            { name: "API服务", slug: "api-service" },
        ]
    };


    return {
      mcpPageData: {
        hero: {
          title: "发现全球优质MCP服务 构建强大AI智能体",
          subtitle: `一站式整合MCP服务器和客户端，当前已收录 ${await this.mcpServicesService.findAll(undefined,1,1).then(r => r.total)}个` // Fetch total count
        },
        infoCards: [
          { title: "AIbase MCP 实验场", description: "在线访问使用 AIbase 平台托管的各类 MCP Server", isComingSoon: true },
          { title: "MCP Inspector", description: "使用 MCP 官方测试通在线测试的 MCP Server", link: "/mcp/inspector" }, // Placeholder link
          { title: "AIbase MCP 教程与实践", description: "了解和学习 MCP，观看和改造最佳实践", link: "/mcp/tutorials" }, // Placeholder link
          { title: "MCP 客户端使用攻略", description: "掌握 MCP 客户端的配置与使用技巧，提升开发效率", link: "/mcp/client-guides" } // Placeholder link
        ],
        featuredServices,
        recentServices,
        categorizedServices: exampleCategorizedServices, // Replace with dynamic fetching logic
        tutorials: tutorialsResult.data,
        faqItems,
        footerData,
      },
      currentYear: new Date().getFullYear() // For footer copyright
    };
  }

  // Add more routes for specific MCP category pages, service detail pages, etc.
  // e.g., @Get('services/category/:categorySlug')
  // @Render('mcp-category-page')
  // async getMCPCategoryPage(@Param('categorySlug') categorySlug: string) { ... }
}
