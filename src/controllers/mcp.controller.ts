import { Controller, Get, Render, Inject, Param, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { MCPServicesService } from '../api/mcpservices/mcpservices.service';
import { MCPTutorialsService } from '../api/mcptutorials/mcptutorials.service';
import { InfoCardsService } from '../api/infocards/infocards.service'; // Import InfoCardsService
import { FAQItemsService } from '../api/faqitems/faqitems.service'; // Import FAQItemsService


@Controller('mcp')
export class MCPPageController {
  constructor(
    private readonly mcpServicesService: MCPServicesService,
    private readonly mcpTutorialsService: MCPTutorialsService,
    private readonly infoCardsService: InfoCardsService, // Inject InfoCardsService
    private readonly faqItemsService: FAQItemsService, // Inject FAQItemsService
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

    const infoCards = await this.infoCardsService.findAll('mcpPage');
    const faqItems = await this.faqItemsService.findAll('mcpGeneral');

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
          subtitle: `一站式整合MCP服务器和客户端，当前已收录 ${await this.mcpServicesService.findAll(undefined,1,1).then(r => r.total)}个`
        },
        infoCards: infoCards, // Use fetched data
        featuredServices,
        recentServices,
        categorizedServices: categorizedServices,
        tutorials: tutorialsResult.data,
        faqItems: faqItems, // Use fetched data
        footerData: {
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
    @Query('lang') selectedLang?: string,
    @Query('verified') selectedVerifiedQueryParam?: string,
    @Query('sort') selectedSort?: string,
  ) {
    const uniqueTags = await this.mcpServicesService.getUniqueTags();
    let tagName = uniqueTags.find(t => this.generateSlug(t) === tagSlug);

    if (!tagName) {
        tagName = tagSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    let isVerifiedFilter: boolean | undefined = undefined;
    if (selectedVerifiedQueryParam === 'true') {
      isVerifiedFilter = true;
    } else if (selectedVerifiedQueryParam === 'false') {
      isVerifiedFilter = false;
    }

    const result = await this.mcpServicesService.findAllByTag(tagName, limit, page, selectedLang, isVerifiedFilter, selectedSort);
    const availableLanguages = await this.mcpServicesService.getUniqueLanguagesForTag(tagName);

    const availableSortOptions = [
        { value: 'popularity_desc', label: 'Popularity' },
        { value: 'rating_desc', label: 'Rating' },
        { value: 'recent_desc', label: 'Recently Added' },
        { value: 'name_asc', label: 'Name (A-Z)' },
        { value: 'name_desc', label: 'Name (Z-A)' },
    ];

    // Construct baseUrl for pagination helper, excluding page itself
    let paginationBaseUrl = `/mcp/services/tag/${tagSlug}?limit=${limit}`;
    if (selectedLang) paginationBaseUrl += `&lang=${selectedLang}`;
    if (selectedVerifiedQueryParam) paginationBaseUrl += `&verified=${selectedVerifiedQueryParam}`;
    if (selectedSort) paginationBaseUrl += `&sort=${selectedSort}`;


    return {
      mcpTagPageData: {
        tagName: tagName || tagSlug,
        tagSlug: tagSlug,
        services: result.data,
        selectedLang: selectedLang,
        availableLanguages: availableLanguages,
        selectedVerifiedStatus: selectedVerifiedQueryParam,
        selectedSort: selectedSort,
        availableSortOptions: availableSortOptions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          limit: limit,
          // No need for hasPreviousPage, previousPage, hasNextPage, nextPage here if helper calculates them
          // But they are useful for simple Prev/Next buttons if not using full number list.
          // Helper can derive them, or they can be kept. For this helper, only currentPage, totalPages, limit are strictly needed.
        },
        paginationBaseUrl: paginationBaseUrl, // Pass to template for the helper
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
    // Add sort to search results page as well, if desired
    @Query('sort') selectedSort?: string,
  ) {
    // Pass selectedSort to service if searchByNameOrDescription is enhanced to use it
    const result = await this.mcpServicesService.searchByNameOrDescription(searchTerm, limit, page /*, selectedSort */);

    let paginationBaseUrl = `/mcp/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`;
    // if (selectedSort) paginationBaseUrl += `&sort=${selectedSort}`;

    // Data for the hero partial if reused on search page
    const heroOverrideData = {
        title: "MCP Service Search", // Or keep it same as landing if design prefers
        // Subtitle can be omitted or specific to search results
    };

    return {
      mcpSearchResultsPageData: {
        searchTerm: searchTerm,
        searchTermEncoded: encodeURIComponent(searchTerm),
        services: result.data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          limit: limit,
          totalItems: result.total
        },
        paginationBaseUrl: paginationBaseUrl,
        heroOverride: heroOverrideData // Pass data for hero partial
      },
      currentYear: new Date().getFullYear()
    };
  }
}
