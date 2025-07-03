import {
  Controller,
  Get,
  Res,
  Query,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { MCPServicesService } from '../api/mcpservices/mcpservices.service';
import { MCPTutorialsService } from '../api/mcptutorials/mcptutorials.service';
import { InfoCardsService } from '../api/infocards/infocards.service';
import { FAQItemsService } from '../api/faqitems/faqitems.service';
import { MCPServceEntity } from '../entities/mcpservice.entity';

interface CategorizedServiceGroup {
  categoryName: string;
  categorySlug: string;
  services: MCPServceEntity[];
  hasMore: boolean;
}

@Controller()
export class MCPPageController {
  constructor(
    private readonly mcpServicesService: MCPServicesService,
    private readonly mcpTutorialsService: MCPTutorialsService,
    private readonly infoCardsService: InfoCardsService,
    private readonly faqItemsService: FAQItemsService,
  ) {}

  @Get('/mcp')
  async getMcpLandingPage(@Res() res: Response) {
    const infoCards = await this.infoCardsService.findAll();
    const faqItems = await this.faqItemsService.findAll();
    const latestTutorials = await this.mcpTutorialsService.findLatest(4);
    const popularServices = await this.mcpServicesService.findPopular(8);
    const categorizedServices =
      await this.mcpServicesService.findCategorizedServices(3);

    const categorizedServiceGroups: CategorizedServiceGroup[] =
      categorizedServices.map((group) => ({
        categoryName: group.categoryName,
        categorySlug: group.categorySlug,
        services: group.services,
        hasMore: group.hasMore,
      }));

    res.render('mcp-landing', {
      infoCards,
      faqItems,
      latestTutorials,
      popularServices,
      categorizedServiceGroups,
      currentPage: 'mcp',
      mcpPage: true,
      helpers: {
        json: (context) => JSON.stringify(context),
      },
    });
  }

  @Get('/mcp/search')
  async searchMcpServices(
    @Res() res: Response,
    @Query('q') q: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort', new DefaultValuePipe('name')) sort: string,
    @Query('languageOrTech') languageOrTech: string,
    @Query('isVerified') isVerified: string,
  ) {
    const { services, total, totalPages } =
      await this.mcpServicesService.searchServices({
        query: q,
        page,
        limit,
        sort,
        languageOrTech,
        isVerified: isVerified === 'true',
      });

    res.render('mcp-search-results', {
      services,
      q,
      currentPage: page,
      totalPages,
      totalResults: total,
      limit,
      sort,
      languageOrTech,
      isVerified,
      mcpPage: true,
      helpers: {
        json: (context) => JSON.stringify(context),
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
      },
    });
  }

  @Get('/mcp/tag/:tag')
  async getMcpServicesByTag(
    @Res() res: Response,
    @Param('tag') tag: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort', new DefaultValuePipe('name')) sort: string,
    @Query('languageOrTech') languageOrTech: string,
    @Query('isVerified') isVerified: string,
  ) {
    const { services, total, totalPages } =
      await this.mcpServicesService.findServicesByTag({
        tag,
        page,
        limit,
        sort,
        languageOrTech,
        isVerified: isVerified === 'true',
      });

    res.render('mcp-tag-page', {
      services,
      tag,
      currentPage: page,
      totalPages,
      totalResults: total,
      limit,
      sort,
      languageOrTech,
      isVerified,
      mcpPage: true,
      helpers: {
        json: (context) => JSON.stringify(context),
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
      },
    });
  }
}
