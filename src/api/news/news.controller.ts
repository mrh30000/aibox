import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from '../../app.service';

@Controller('news')
export class NewsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllNews(
    @Query('category') category?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const newsData = this.appService.getNewsData();
    let news = newsData.newsItems;

    // 分类筛选
    if (category && category !== '全部') {
      news = news.filter(item => item.category === category);
    }

    // 分页
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedNews = news.slice(startIndex, endIndex);

    return {
      news: paginatedNews,
      total: news.length,
      page: pageNum,
      limit: limitNum,
      categories: ['全部', 'AI头条', '产品发布', '技术进展', '行业动态'],
    };
  }

  @Get('search')
  searchNews(@Query('q') query: string) {
    const newsData = this.appService.getNewsData();
    const news = newsData.newsItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      news,
      query,
      total: news.length,
    };
  }

  @Get('trending')
  getTrendingNews() {
    const newsData = this.appService.getNewsData();
    // 模拟获取热门新闻（前5条）
    const trendingNews = newsData.newsItems.slice(0, 5);

    return {
      news: trendingNews,
      title: '热门新闻',
    };
  }

  @Get(':id')
  getNewsById(@Param('id') id: string) {
    const newsData = this.appService.getNewsData();
    const newsItem = newsData.newsItems.find(item => item.id.toString() === id);

    if (!newsItem) {
      return { error: 'News not found' };
    }

    // 模拟完整新闻内容
    return {
      ...newsItem,
      content: `
        <p>这是新闻的详细内容。${newsItem.title}</p>
        <p>人工智能技术正在快速发展，为各行各业带来了革命性的变化。从自然语言处理到计算机视觉，从推荐系统到自动驾驶，AI技术的应用越来越广泛。</p>
        <h3>技术亮点</h3>
        <ul>
          <li>先进的深度学习算法</li>
          <li>大规模数据处理能力</li>
          <li>实时推理和决策</li>
          <li>多模态融合技术</li>
        </ul>
        <h3>应用场景</h3>
        <p>该技术可以应用于智能客服、内容生成、数据分析、图像识别等多个领域，为用户提供更好的体验和更高的效率。</p>
        <h3>未来展望</h3>
        <p>随着技术的不断进步，我们相信AI将在更多领域发挥重要作用，推动社会的数字化转型和智能化发展。</p>
      `,
      author: 'AIbase编辑部',
      publishTime: newsItem.date,
      readTime: '3分钟',
      tags: ['人工智能', '技术创新', '行业动态'],
      relatedNews: newsData.newsItems.slice(0, 3).filter(item => item.id !== newsItem.id),
      stats: {
        views: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 50) + 5,
      },
    };
  }
}
