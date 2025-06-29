import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePageData() {
    return {
      title: 'AIbase基地 - 让更多人看到未来 通往AGI之路',
      newsItems: this.getLatestNews(),
      hotTools: this.getHotTools(),
      categories: this.getCategories(),
      projects: this.getOpenSourceProjects(),
      featured: this.getFeaturedContent(),
    };
  }

  getNewsData() {
    return {
      title: 'AI资讯 - AIbase基地',
      newsItems: this.getLatestNews(),
    };
  }

  getToolsData() {
    return {
      title: 'AI工具 - AIbase基地',
      tools: this.getHotTools(),
      categories: this.getCategories(),
    };
  }

  getProjectsData() {
    return {
      title: 'AI开源项目 - AIbase基地',
      projects: this.getOpenSourceProjects(),
    };
  }

  // Making these methods public so they can be called by AppController
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
}
