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
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
    @Query('lang') selectedLang?: string, // Added selectedLang query parameter
  ) {
    const uniqueTags = await this.mcpServicesService.getUniqueTags();
    let tagName = uniqueTags.find(t => this.generateSlug(t) === tagSlug);

    if (!tagName) {
        // Basic de-slugification, might need improvement for complex tags
        tagName = tagSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        // A more robust way would be to query one item by slug if tags were stored with slugs,
        // or to ensure generateSlug is perfectly reversible for your tag set.
        // For now, this is a heuristic. If no exact match, service might not find items.
        // Consider querying by slug directly if your service/schema supports it.
    }

    const result = await this.mcpServicesService.findAllByTag(tagName, limit, page, selectedLang);
    const availableLanguages = await this.mcpServicesService.getUniqueLanguagesForTag(tagName);

    return {
      mcpTagPageData: {
        tagName: tagName || tagSlug,
        tagSlug: tagSlug,
        services: result.data,
        selectedLang: selectedLang, // Pass selected language to template
        availableLanguages: availableLanguages, // Pass available languages for this tag
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          hasPreviousPage: page > 1,
          previousPage: page - 1,
          hasNextPage: page < Math.ceil(result.total / limit),
          nextPage: page + 1,
          limit: limit
        },
      },
      currentYear: new Date().getFullYear()
    };
  }

  @Get('search')
  @Render('mcp-search-results')
  async searchMCPPage(
    @Query('q') searchTerm: string = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
  ) {
    const result = await this.mcpServicesService.searchByNameOrDescription(searchTerm, limit, page);

    return {
      mcpSearchResultsPageData: {
        searchTerm: searchTerm,
        searchTermEncoded: encodeURIComponent(searchTerm), // For use in pagination links
        services: result.data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          hasPreviousPage: page > 1,
          previousPage: page - 1,
          hasNextPage: page < Math.ceil(result.total / limit),
          nextPage: page + 1,
          limit: limit,
          totalItems: result.total
        },
      },
      currentYear: new Date().getFullYear()
    };
  }
}
