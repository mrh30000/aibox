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

  private generateSlug(text: string): string {
    if (!text) return '';
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  @Get()
  @Render('mcp-landing')
  async getMCPPage() {
    const featuredServices = await this.mcpServicesService.findFeatured(8);
    const recentServices = await this.mcpServicesService.findRecent(8);
    const tutorialsResult = await this.mcpTutorialsService.findAll(4);

    const uniqueTags = await this.mcpServicesService.getUniqueTags();
    const categorizedServices = [];

    for (const tagName of uniqueTags.slice(0, 5)) { // Limit to 5 categories on landing page for brevity
        const servicesForTag = await this.mcpServicesService.findAllByTag(tagName, 4, 1);
        if (servicesForTag.data && servicesForTag.data.length > 0) {
            categorizedServices.push({
                categoryName: tagName,
                categorySlug: this.generateSlug(tagName),
                services: servicesForTag.data,
                hasMore: servicesForTag.total > 4
            });
        }
    }

    // Placeholder for FAQ data
    const faqItems = [
      { question: "什么是MCP (Model Context Protocol)？", answer: "MCP（Model Context Protocol）是一种开放标准协议，允许AI模型与外部工具和服务进行交互。它为大型语言模型（LLMs）提供了一种标准化的方式来访问和操作外部数据、API和服务..." },
      { question: "如何在我的开发环境中设置MCP服务器？", answer: "设置MCP服务器通常需要以下步骤：1) 安装所需的MCP客户端...具体步骤可能因不同的MCP服务和客户端而略有不同。" },
      { question: "MCP与传统API调用有什么区别?", answer: "MCP与传统API调用的主要区别在于：1) MCP提供了一个统一的接口...5) MCP支持会话上下文..." },
      // Add more FAQs from the target site
    ];

    // Dynamic Footer Data
    const popularMcpServices = await this.mcpServicesService.findFeatured(7); // Get 7 for footer
    const popularMcpCategoriesRaw = await this.mcpServicesService.getUniqueTags();
    const popularMcpCategories = popularMcpCategoriesRaw.slice(0, 7).map(tag => ({ // Get 7 tags for footer
        name: tag,
        slug: this.generateSlug(tag)
    }));
    // For "Popular Tags" in footer, we can reuse the same logic or develop a different one if tags have counts etc.
    // For simplicity, reusing the category tags for "Popular Tags" section as well.
    const popularMcpFooterTags = popularMcpCategories.slice(0, 7);


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
        categorizedServices: categorizedServices,
        tutorials: tutorialsResult.data,
        faqItems,
        footerData: { // Populating footerData dynamically
            popularServices: popularMcpServices.map(s => ({ name: s.name, url: s.externalServiceUrl || '#' })),
            popularCategories: popularMcpCategories,
            popularTags: popularMcpFooterTags
        },
      },
      currentYear: new Date().getFullYear() // For footer copyright
    };
  }

  // Add more routes for specific MCP category pages, service detail pages, etc.

  @Get('services/tag/:tagSlug')
  @Render('mcp-tag-page')
  async getMCPTagPage(
    @Param('tagSlug') tagSlug: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number, // Show more items on tag page
  ) {
    // Convert slug back to original tag name if necessary, or ensure tags are stored/queried consistently.
    // For this example, assuming tags are stored as they are displayed (e.g. "开发效率工具")
    // and the slug is just for URL. We need a way to get original tag from slug if they differ significantly.
    // A simple approach: if tags are directly used from getUniqueTags, they are the original names.
    // The slug is generated for URL. The service's findByTag expects the original tag name.

    // This is a simplification. A robust solution might involve storing slugs with categories
    // or having a way to reverse the slug generation reliably if it involves more than lowercasing and hyphenating.
    // For now, we'll try to find the original tag name from the list of unique tags if possible,
    // or assume the slug can be "de-slugified" simply.

    const uniqueTags = await this.mcpServicesService.getUniqueTags();
    let tagName = uniqueTags.find(t => this.generateSlug(t) === tagSlug);

    if (!tagName) {
        // Fallback: try to "de-slugify" (simple version)
        tagName = tagSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // This is very basic
        // A better approach would be to query the first item with that tag to get the canonical tag name
        // or have a separate category/tag entity.
    }

    const result = await this.mcpServicesService.findAllByTag(tagName, limit, page);

    return {
      mcpTagPageData: {
        tagName: tagName || tagSlug, // Display the found tag name or the slug if not found
        tagSlug: tagSlug,
        services: result.data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          hasPreviousPage: page > 1,
          previousPage: page - 1,
          hasNextPage: page < Math.ceil(result.total / limit),
          nextPage: page + 1,
        },
      },
      currentYear: new Date().getFullYear()
    };
  }
}
