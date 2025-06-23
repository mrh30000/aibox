import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from '../../app.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTools(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const toolsData = this.appService.getToolsData();
    let tools = toolsData.tools;

    // 分类筛选
    if (category && category !== '全部') {
      tools = tools.filter(tool => tool.category === category);
    }

    // 排序
    if (sort) {
      switch (sort) {
        case 'popularity':
          tools = tools.sort((a, b) => parseInt(b.visitors) - parseInt(a.visitors));
          break;
        case 'newest':
          // 模拟按最新排序
          break;
        case 'rating':
          // 模拟按评分排序
          break;
      }
    }

    // 分页
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedTools = tools.slice(startIndex, endIndex);

    return {
      tools: paginatedTools,
      total: tools.length,
      page: pageNum,
      limit: limitNum,
      categories: toolsData.categories,
    };
  }

  @Get('search')
  searchTools(@Query('q') query: string) {
    const toolsData = this.appService.getToolsData();
    const tools = toolsData.tools.filter(tool =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase())
    );

    return {
      tools,
      query,
      total: tools.length,
    };
  }

  @Get('trending')
  getTrendingTools() {
    const toolsData = this.appService.getToolsData();
    // 模拟获取趋势工具（按增长率排序）
    const trendingTools = toolsData.tools
      .filter(tool => tool.change.includes('+'))
      .sort((a, b) => {
        const aChange = parseFloat(a.change.replace(/[+%]/g, ''));
        const bChange = parseFloat(b.change.replace(/[+%]/g, ''));
        return bChange - aChange;
      })
      .slice(0, 10);

    return {
      tools: trendingTools,
      title: '本周热门工具',
    };
  }

  @Get(':id')
  getToolById(@Param('id') id: string) {
    const toolsData = this.appService.getToolsData();
    const tool = toolsData.tools.find(t => t.id.toString() === id);

    if (!tool) {
      return { error: 'Tool not found' };
    }

    // 模拟详细信息
    return {
      ...tool,
      detailedDescription: '这是一个功能强大的AI工具，提供了丰富的功能和特性...',
      features: [
        '智能识别和分析',
        '多语言支持',
        '云端同步',
        'API接口',
        '实时协作',
      ],
      pricing: {
        free: true,
        plans: [
          { name: '免费版', price: 0, features: ['基础功能', '每月100次调用'] },
          { name: '专业版', price: 29, features: ['全部功能', '每月10000次调用', '优先支持'] },
          { name: '企业版', price: 99, features: ['全部功能', '无限调用', '专属客服', '定制开发'] },
        ],
      },
      reviews: [
        { user: '张三', rating: 5, comment: '非常好用的工具，大大提高了工作效率！' },
        { user: '李四', rating: 4, comment: '功能很强大，界面也很友好。' },
      ],
      stats: {
        totalUsers: '125,000+',
        satisfaction: '98%',
        avgRating: 4.8,
        languages: 15,
      },
    };
  }
}
