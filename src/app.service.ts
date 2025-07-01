import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // These methods were originally for HBS views and are now replaced by more specific API data methods.
  // getHomePageData() { ... }
  // getNewsData() { ... }
  // getToolsData() { ... }
  // getProjectsData() { ... }

  // Public data retrieval methods used by current API endpoints
  public getLatestNews() {
    return [
      {
        id: 1,
        title: '正式开源！DeepSeek-R1-0528震撼发布，性能直逼OpenAI o3，免费API已上线',
        date: '5月29日',
        category: 'AI头条',
        image: 'https://ext.same-assets.com/155488376/4141911314.jpeg',
      },
      {
        id: 2,
        title: 'Epic 创新！《堡垒之夜》引入生成式AI，轻松定制游戏 NPC',
        date: '6/4/2025',
      },
      {
        id: 3,
        title: 'Komiko视频内视频功能样式上线！AI一键生动叙述大片，满足创作者从头到脚的创作需求',
        date: '6/4/2025',
      },
      {
        id: 4,
        title: 'Expensya创始人"春哥"重磅创业，AI测试平台Thunder Code获900万美元种子轮',
        date: '6/4/2025',
      },
      {
        id: 5,
        title: '松下推出"OmniFlow"多核心生成AI文本、图像与音频的自由转换',
        date: '6/4/2025',
      },
    ];
  }

  public getHotTools() {
    return [
      {
        id: 1,
        name: '灵码 IDE',
        description: '智能编程助手，提供高效的代码生成和调试功能',
        visitors: '1020',
        change: '+25.45%',
        icon: 'https://ext.same-assets.com/155488376/214188947.jpeg',
        category: '编程开发',
      },
      {
        id: 2,
        name: 'Opera Neon',
        description: 'Neon是一个个性化AI助手',
        visitors: '924357%',
        change: '+924357%',
        icon: 'https://ext.same-assets.com/155488376/978546982.jpeg',
        category: '智能助手',
      },
      {
        id: 3,
        name: 'ChatGPT',
        description: '智能对话助手，提供个性化体验',
        visitors: '13%',
        change: '+13%',
        icon: 'https://ext.same-assets.com/155488376/946268843.jpeg',
        category: '智能助手',
      },
      {
        id: 4,
        name: 'Claude 4',
        description: '全球领先的智能对话机器人',
        visitors: '730',
        change: '+25%',
        icon: 'https://ext.same-assets.com/155488376/614836080.jpeg',
        category: '智能助手',
      },
      {
        id: 5,
        name: 'DeepSeek R1-0528',
        description: 'DeepSeek R1-0528 是一款开放的推理模型',
        visitors: '760',
        change: '+16.67%',
        icon: 'https://ext.same-assets.com/155488376/946268843.jpeg',
        category: '推理模型',
      },
    ];
  }

  public getCategories() {
    return [
      { id: 1, name: '全部', icon: '📱', count: 20150 },
      { id: 2, name: '智天机器人', icon: '🤖', count: 1250 },
      { id: 3, name: 'AI搜索', icon: '🔍', count: 890 },
      { id: 4, name: 'AI设计工具', icon: '🎨', count: 1420 },
      { id: 5, name: '个人助理', icon: '👤', count: 2100 },
      { id: 6, name: '编程生成', icon: '💻', count: 780 },
      { id: 7, name: '音乐生成', icon: '🎵', count: 560 },
      { id: 8, name: '图片编辑处理', icon: '🖼️', count: 1890 },
      { id: 9, name: '声音处理', icon: '🔊', count: 670 },
      { id: 10, name: '视频生成', icon: '🎬', count: 1120 },
      { id: 11, name: 'PPT高效对接', icon: '📊', count: 450 },
      { id: 12, name: '文案写作', icon: '✍️', count: 2340 },
    ];
  }

  public getOpenSourceProjects() {
    return [
      {
        id: 1,
        name: 'MLLMCelltype',
        stars: 68,
        change: '+68',
        description: '机器学习细胞类型分析工具',
        category: '热门AI开源项目',
      },
      {
        id: 2,
        name: 'Mcp Containers',
        stars: 50,
        change: '+50',
        description: '容器化MCP部署解决方案',
        category: '热门AI开源项目',
      },
      {
        id: 3,
        name: 'Bert VITS2 MNN',
        stars: 15,
        change: '+15',
        description: 'TTS语音合成模型',
        category: 'TTS',
      },
      {
        id: 4,
        name: 'EShopLite',
        stars: 5,
        change: '+5',
        description: '轻量级电商解决方案',
        category: 'Deepseek',
      },
      {
        id: 5,
        name: 'Dria Livekit Agent Deep Research',
        stars: 1,
        change: '+1',
        description: '深度研究AI代理',
        category: 'STT',
      },
    ];
  }

  public getFeaturedContent() {
    return [
      {
        id: 1,
        title: '【迄今为止】AI生成视频变音效大法，30天深入月万的机',
        views: 1056609,
        image: 'https://ext.same-assets.com/155488376/3855352707.jpeg',
        category: '视频教程',
      },
      {
        id: 2,
        title: '零成本让社会保底3天涨粉10万+！AI作美好猜想2W+空可关怀',
        views: 1194149,
        image: 'https://ext.same-assets.com/155488376/3771287357.jpeg',
        category: '案例分析',
      },
      {
        id: 3,
        title: '从0到1：AI软件提验收制作流程，一周浪费2W+学实可',
        views: 1053078,
        image: 'https://ext.same-assets.com/155488376/3462235925.jpeg',
        category: '教程指南',
      },
      {
        id: 4,
        title: '利用AI脚作者百Q情歌曲制作，小作者留言引论喜欢',
        views: 384254,
        image: 'https://ext.same-assets.com/155488376/1232832195.png',
        category: '创作案例',
      },
      {
        id: 5,
        title: 'AI视频创业：百千石团队如何用月可交婊觉六数据入',
        views: 681696,
        image: 'https://ext.same-assets.com/155488376/3873054046.png',
        category: '创业分享',
      },
    ];
  }

  getNewsPageData() {
    // For now, let's return a subset of hot tools as recommended tools for the news page
    const allHotTools = this.getHotTools();
    const recommendedTools = allHotTools.slice(0, 2).map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description, // Or a shorter version if available
      icon: tool.icon,
    }));

    // Placeholder for topics, actual implementation might involve another data source
    const popularTopics = [
      { id: 'deepseek', name: 'DeepSeek' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'ai-video', name: 'AI视频生成' },
      { id: 'ml', name: '机器学习' },
      { id: 'auto-driving', name: '自动驾驶' },
      { id: 'cv', name: '计算机视觉' },
    ];

    return {
      newsItems: this.getLatestNews(), // This doesn't support pagination yet
      recommendedTools: recommendedTools,
      popularTopics: popularTopics,
      // We might need to add totalPages, currentPage for pagination later
    };
  }

  getToolsPageData(category?: string, sort?: string, page: number = 1, limit: number = 10) {
    let tools = this.getHotTools().map(tool => ({ ...tool, rating: Math.random() * 2 + 3, features: ['免费试用', 'API接口', '多语言'].slice(0, Math.floor(Math.random() * 3) + 1) })); // Add mock rating and features

    // TODO: Implement actual filtering by category
    if (category && category !== '全部' && category !== 'all') { // 'all' is from placeholderCategories in ToolsPage.tsx
      tools = tools.filter(tool => tool.category === category);
    }

    // TODO: Implement actual sorting
    if (sort === 'newest') {
      // Assuming higher ID is newer for mock data
      tools.sort((a, b) => b.id - a.id);
    } else if (sort === 'rating') {
      tools.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'popularity') {
      // Popularity might be based on visitors, but visitors is a string like "1.2K"
      // For now, just a placeholder sort or use ID
      tools.sort((a, b) => a.id - b.id);
    }
    // 'free' sort option would require a flag on the tool data

    const totalTools = tools.length;
    const paginatedTools = tools.slice((page - 1) * limit, page * limit);


    const categories = this.getCategories().map(cat => ({
        id: String(cat.id), // Ensure ID is string to match ToolCategory interface if needed
        name: cat.name,
        icon: cat.icon,
        count: cat.count // This count might be for all tools, not filtered ones
    }));

    // Sidebar data (can be placeholders or from other methods)
    const trendingTools = this.getHotTools().slice(0,3).map(t => ({id: String(t.id), name: t.name, icon: t.icon, change: t.change}));
    const sidebarNews = this.getLatestNews().slice(0,3).map(n => ({id: String(n.id), title: n.title, time: n.date}));


    return {
      tools: paginatedTools,
      categories: categories,
      trendingTools: trendingTools,
      sidebarNews: sidebarNews,
      totalTools: totalTools,
      currentPage: page,
      totalPages: Math.ceil(totalTools / limit),
    };
  }

  getProjectsPageData(category?: string, sort?: string, time?: string, page: number = 1, limit: number = 5) {
    // Mock data source:
    const allMockProjects = [
      { id: 'p1', rank: '#1', avatarLetter: 'M', name: 'MLLMCelltype', description: '机器学习细胞类型分析工具，提供高精度的细胞分类和识别功能', tags: ['Python', 'Machine Learning', 'Bioinformatics'], stars: 68, growth: '+68', forks: 12, categoryId: 'all', categoryName: '热门AI开源项目', createdAt: new Date('2024-05-20T10:00:00Z'), updatedAt: new Date('2024-06-01T10:00:00Z') },
      { id: 'p2', rank: '#2', avatarLetter: 'M', name: 'Mcp Containers', description: '容器化MCP部署解决方案，简化AI模型的部署和管理流程', tags: ['Docker', 'Kubernetes', 'DevOps'], stars: 50, growth: '+50', forks: 8, categoryId: 'all', categoryName: '热门AI开源项目', createdAt: new Date('2024-05-15T10:00:00Z'), updatedAt: new Date('2024-06-02T10:00:00Z') },
      { id: 'p3', rank: '#3', avatarLetter: 'S', name: 'Scira Mcp Chat', description: '基于MCP协议的智能聊天系统，支持多模态对话交互', tags: ['TypeScript', 'Chat', 'MCP'], stars: 41, growth: '+41', forks: 6, categoryId: 'all', categoryName: '热门AI开源项目', createdAt: new Date('2024-04-20T10:00:00Z'), updatedAt: new Date('2024-05-28T10:00:00Z')},
      { id: 'p4', rank: '#1', avatarLetter: 'B', name: 'Bert VITS2 MNN', description: '基于BERT的语音合成模型，支持多种语言和音色', tags: ['Python', 'TTS', 'BERT'], stars: 15, growth: '+15', forks: 3, categoryId: 'tts', categoryName: 'TTS 语音合成', createdAt: new Date('2024-03-10T10:00:00Z'), updatedAt: new Date('2024-05-25T10:00:00Z') },
      { id: 'p5', rank: '#1', avatarLetter: 'E', name: 'EShopLite', description: '轻量级电商解决方案，集成Deepseek AI推荐系统', tags: ['React', 'E-commerce', 'AI'], stars: 5, growth: '+5', forks: 1, categoryId: 'deepseek', categoryName: 'Deepseek 相关项目', createdAt: new Date('2024-02-20T10:00:00Z'), updatedAt: new Date('2024-05-10T10:00:00Z') },
      { id: 'p6', name: 'Another TTS Project', description: 'Another great TTS tool', tags: ['Audio', 'TTS'], stars: 22, growth: '+2', forks: 4, categoryId: 'tts', categoryName: 'TTS 语音合成', createdAt: new Date('2024-05-01T12:00:00Z'), updatedAt: new Date('2024-06-03T12:00:00Z') },
      { id: 'p7', name: 'DeepSeek Analyzer', description: 'Analyze data with DeepSeek tech', tags: ['Python', 'DeepSeek'], stars: 30, growth: '+10', forks: 7, categoryId: 'deepseek', categoryName: 'Deepseek 相关项目', createdAt: new Date('2024-05-05T10:00:00Z'), updatedAt: new Date('2024-06-01T14:00:00Z') },
    ];

    let filteredProjects = allMockProjects;

    // Filter by category
    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.categoryId === category);
    }

    // TODO: Filter by time (today, this week, this month)
    // This requires comparing createdAt/updatedAt with current date.
    // For now, this is a placeholder.
    if (time && time !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Assuming week starts on Sunday
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        if (time === 'today' || time === '今日') { // '今日' for consistency with UI
            filteredProjects = filteredProjects.filter(p => new Date(p.updatedAt) >= today);
        } else if (time === 'this week' || time === '本周') {
            filteredProjects = filteredProjects.filter(p => new Date(p.updatedAt) >= weekStart);
        } else if (time === 'this month' || time === '本月') {
            filteredProjects = filteredProjects.filter(p => new Date(p.updatedAt) >= monthStart);
        }
    }


    // Sort projects
    if (sort === 'stars') {
      filteredProjects.sort((a, b) => b.stars - a.stars);
    } else if (sort === 'updated') {
      filteredProjects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sort === 'created') {
      filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'growth') {
      // Assuming growth is like "+68", so parse the number
      filteredProjects.sort((a, b) => parseInt(b.growth.substring(1)) - parseInt(a.growth.substring(1)));
    }

    // Assign rank after filtering and sorting
    filteredProjects = filteredProjects.map((p, index) => ({...p, rank: `#${index + 1}`}));


    const totalProjects = filteredProjects.length;
    const paginatedProjects = filteredProjects.slice((page - 1) * limit, page * limit);

    // Group by category for display if needed, or return flat list and group in frontend
    // For this structure, we'll return a flat list and let frontend decide on grouping display based on selected category
    // Or, if 'all' categories are selected, group them.

    const projectCategories = [
      { id: 'all', name: '热门项目', icon: '🏆', count: allMockProjects.length }, // Count might need to be dynamic based on actual data
      { id: 'tts', name: 'TTS', icon: '🎵', count: allMockProjects.filter(p=>p.categoryId === 'tts').length },
      { id: 'deepseek', name: 'Deepseek', icon: '🧠', count: allMockProjects.filter(p=>p.categoryId === 'deepseek').length },
      { id: 'stt', name: 'STT', icon: '🎤', count: allMockProjects.filter(p=>p.categoryId === 'stt').length || 0 }, // Example
      // Add other categories from projects.hbs
    ];

    const stats = [
        { id: 'ps1', number: `${totalProjects}+`, label: '开源项目' }, // totalProjects from filtered or all?
        { id: 'ps2', number: `${allMockProjects.reduce((sum, p) => sum + p.stars, 0) / 1000}K+`, label: 'GitHub Stars' },
        { id: 'ps3', number: '120+', label: '活跃项目' }, // Placeholder
        { id: 'ps4', number: `${projectCategories.filter(pc => pc.id !== 'all').length}+`, label: '技术分类' },
    ];


    // If specific category is selected, only return projects for that category
    // Otherwise, for "all", we might need to structure it by group.
    // For simplicity now, if a category is selected, paginatedProjects will only contain those.
    // If 'all', it will contain mixed projects, paginated. Frontend can group if needed or display as a mixed list.
    // The HBS structure suggests grouping even for "all".
    // Let's try to return grouped data if category is 'all' or not specified.

    let resultProjectData;
    if (!category || category === 'all') {
        resultProjectData = projectCategories
            .filter(pc => pc.id !== 'all' && allMockProjects.some(p => p.categoryId === pc.id)) // Only categories with projects
            .map(pc => ({
                categoryName: pc.name,
                categoryDesc: `${allMockProjects.filter(p => p.categoryId === pc.id).length} repositories`,
                projects: allMockProjects.filter(p => p.categoryId === pc.id)
                                        .sort((a,b) => b.stars - a.stars) // Example sort within group
                                        .map((p,idx) => ({...p, rank: `#${idx + 1}`}))
                                        // .slice(0, 3) // Optionally limit initial display per category for "all" view
            }));
        // For "all" tab, we might want a combined "热门项目" list first from paginatedProjects
        // This part needs careful thought to match the HBS structure where "热门AI开源项目" shows top from all.
        // Let's provide a "featured" group from the globally sorted/paginated list for the "all" view,
        // and then other categories can be listed below or handled by specific category selection.
        // For now, `paginatedProjects` will be the primary list for the active filter.
    }


    return {
      stats: stats,
      categoryTabs: projectCategories,
      projects: paginatedProjects, // This is the primary list based on filters/pagination
      // projectGroups: groupedProjects, // Alternative structure for "all" view
      totalProjects: totalProjects,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
    };
  }

  getMcpLandingPageData() {
    // This method should aggregate all data needed for the MCP Landing Page.
    // It will use existing public methods or new private ones if specific data is needed.

    // Example: Using existing getHotTools for featured/recent services (adapt as needed)
    const allServices = this.getHotTools().map(tool => ({ // Assuming HotTool structure is similar enough to ServiceData
        id: tool.id,
        externalServiceUrl: `/mcp/service/${tool.id}`, // Placeholder URL
        imageUrl: tool.icon,
        name: tool.name,
        isVerified: Math.random() > 0.5, // Mock verification
        description: tool.description,
        languageOrTech: tool.category, // Using tool category as tech stack for mock
        userCountOrStars: tool.visitors, // Assuming visitors can map to userCount
        rating: (Math.random() * 2 + 3).toFixed(1) // Mock rating
    }));

    const featuredServices = allServices.slice(0, 2);
    const recentServices = allServices.slice(2, 4);

    // Mock categorized services
    const categorizedServices = [
        {
            categoryName: '数据分析与处理',
            categorySlug: 'data-analytics',
            services: allServices.slice(0,1).map(s => ({...s, id: `cat1-${s.id}`})),
            hasMore: true
        },
        {
            categoryName: 'AI模型集成',
            categorySlug: 'ai-integration',
            services: allServices.slice(1,2).map(s => ({...s, id: `cat2-${s.id}`})),
            hasMore: true
        },
    ];

    // Mock tutorials (can use getFeaturedContent or new data source)
    const tutorials = this.getFeaturedContent().slice(0,3).map(item => ({
        id: item.id,
        externalTutorialUrl: `/mcp/tutorial/${item.id}`, // Placeholder
        imageUrl: item.image,
        title: item.title,
        summary: `简要教程摘要，关于 ${item.title}`, // Mock summary
        publishDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0], // Mock date
        viewCount: item.views
    }));

    // Mock FAQ items
    const faqItems = [
        { question: 'MCP服务如何收费？', answer: '大部分MCP服务提供按需付费模式，部分基础服务可能提供免费套餐。详情请查看具体服务的定价页面。HTML <b>加粗</b> 内容也可以。' },
        { question: '如何保证服务的可用性？', answer: '我们致力于提供高可用的MCP服务，并设有服务等级协议（SLA）。具体服务的SLA请参考其文档。' },
        { question: '我可以创建自己的MCP服务吗？', answer: '是的，我们提供了完善的开发者工具和文档，帮助您轻松创建和发布自己的MCP服务。' }
    ];

    return {
      hero: { title: 'AIbase MCP 服务中心', subtitle: '探索、集成并管理您的微组件化服务。' },
      infoCards: [
          { title: '什么是MCP？', description: '了解MCP架构的核心概念。', linkUrl: '/mcp/docs/what-is-mcp' },
          { title: '快速入门指南', description: '几分钟内集成您的第一个MCP服务。', linkUrl: '/mcp/docs/quickstart' },
          { title: '服务市场', description: '浏览可用的MCP服务。', linkUrl: '/mcp/services' },
          { title: '开发者文档', description: '深入了解MCP SDK和API。', linkUrl: '/mcp/docs/developer', isComingSoon: true, isExternalLink: false },
      ],
      featuredServices: featuredServices,
      recentServices: recentServices,
      categorizedServices: categorizedServices,
      tutorials: tutorials,
      faqItems: faqItems,
      // initialSearchTerm: '' // Optional: if you want to prefill search
    };
  }

  // Method to get all MCP services (can be a more complex data source later)
  private getAllMcpServices() {
    // For now, use a combination of hot tools and some new mock services
    // to simulate a larger dataset for searching.
    const baseServices = this.getHotTools().map(tool => ({
        id: `mcp-ht-${tool.id}`,
        externalServiceUrl: `/mcp/service/ht-${tool.id}`, // Placeholder
        imageUrl: tool.icon,
        name: `${tool.name} (MCP Adapter)`,
        isVerified: Math.random() > 0.3,
        description: `MCP version of ${tool.description}`,
        languageOrTech: tool.category,
        userCountOrStars: tool.visitors,
        rating: (Math.random() * 2 + 3).toFixed(1)
    }));

    const additionalServices = [
        { id: 'mcp-s1', name: 'Notification MCP Service', description: 'Handles all kinds of notifications via MCP.', externalServiceUrl: '#', languageOrTech: 'Java', userCountOrStars: 1200, rating: '4.7', isVerified: true, imageUrl: 'https://via.placeholder.com/100x70?text=NotifyMCP' },
        { id: 'mcp-s2', name: 'Data Storage MCP', description: 'Scalable and reliable data storage MCP.', externalServiceUrl: '#', languageOrTech: 'Go', userCountOrStars: '2.1K', rating: '4.9', isVerified: true, imageUrl: 'https://via.placeholder.com/100x70?text=StoreMCP' },
        { id: 'mcp-s3', name: 'Logging MCP Framework', description: 'Centralized logging for distributed MCPs.', externalServiceUrl: '#', languageOrTech: 'Python', userCountOrStars: 750, rating: '4.3', isVerified: false, imageUrl: 'https://via.placeholder.com/100x70?text=LogMCP' },
        { id: 'mcp-s4', name: 'Auth MCP Deluxe', description: 'Deluxe authentication and authorization MCP.', externalServiceUrl: '#', languageOrTech: 'Ruby', userCountOrStars: '500', rating: '4.6', isVerified: true, imageUrl: 'https://via.placeholder.com/100x70?text=AuthDlx' },
    ];
    return [...baseServices, ...additionalServices];
  }

  searchMcpServices(query: string, page: number = 1, limit: number = 10) {
    const allServices = this.getAllMcpServices();
    const searchTerm = query.toLowerCase();

    const filteredServices = searchTerm
      ? allServices.filter(service =>
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          (service.languageOrTech && service.languageOrTech.toLowerCase().includes(searchTerm))
        )
      : allServices; // Return all if query is empty, or handle as no results

    const totalItems = filteredServices.length;
    const paginatedServices = filteredServices.slice((page - 1) * limit, page * limit);

    return {
      services: paginatedServices,
      searchTerm: query,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems,
        limit: limit,
      },
    };
  }

  getMcpServicesByTag(
    tagSlug: string,
    lang?: string,
    verified?: string,
    sort?: string,
    page: number = 1,
    limit: number = 10
  ) {
    // Mock data: Assume all services from getAllMcpServices() can have tags.
    // In a real scenario, services would have a 'tags' array or similar.
    let services = this.getAllMcpServices().map(s => ({
        ...s,
        // Mocking tags: assign some tags to each service for filtering by tagSlug
        tags: ['data-processing', 'ai-integration', 'notifications', s.languageOrTech?.toLowerCase()].filter(Boolean)
    }));

    // 1. Filter by tagSlug
    // For mock, we assume tagSlug matches one of the tags in the service's mocked 'tags' array.
    // Or, if tagSlug represents a category like 'data-analytics', we can filter by that.
    // Let's assume tagSlug is a direct tag.
    services = services.filter(s => s.tags.includes(tagSlug));

    const tagName = tagSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Convert slug to readable name

    // 2. Filter by language/tech (lang query param)
    if (lang) {
      services = services.filter(s => s.languageOrTech?.toLowerCase() === lang.toLowerCase());
    }

    // 3. Filter by verification status (verified query param)
    if (verified === 'true') {
      services = services.filter(s => s.isVerified === true);
    } else if (verified === 'false') {
      services = services.filter(s => s.isVerified === false || s.isVerified === undefined);
    }

    // 4. Sort
    // Mock sort options and logic
    if (sort === 'popularity') { // Placeholder: sort by userCount/Stars desc
        services.sort((a, b) => (parseFloat(String(b.userCountOrStars).replace('K','000').replace('M','000000')) || 0) - (parseFloat(String(a.userCountOrStars).replace('K','000').replace('M','000000')) || 0));
    } else if (sort === 'rating') { // Sort by rating desc
        services.sort((a,b) => (parseFloat(String(b.rating)) || 0) - (parseFloat(String(a.rating)) || 0));
    } else if (sort === 'newest') { // Placeholder: sort by ID desc for mock
        services.sort((a,b) => String(b.id).localeCompare(String(a.id)));
    }
    // Default sort could be by name or relevance if available

    const totalItems = services.length;
    const paginatedServices = services.slice((page - 1) * limit, page * limit);

    // Mock available languages from the filtered set of services (before pagination)
    const availableLanguages = [...new Set(services.map(s => s.languageOrTech).filter(Boolean) as string[])].sort();

    const availableSortOptions = [
        {value: 'popularity', label: 'Popularity'},
        {value: 'rating', label: 'Rating'},
        {value: 'newest', label: 'Newest'}
    ];

    return {
      tagName: tagName,
      tagSlug: tagSlug,
      services: paginatedServices,
      availableLanguages: availableLanguages,
      availableSortOptions: availableSortOptions,
      selectedLang: lang,
      selectedVerifiedStatus: verified,
      selectedSort: sort,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems,
        limit: limit,
      },
    };
  }
}
