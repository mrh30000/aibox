import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from '../../app.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllProjects(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const projectsData = this.appService.getProjectsData();
    let projects = projectsData.projects;

    // 分类筛选
    if (category && category !== 'all') {
      projects = projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
    }

    // 排序
    if (sort) {
      switch (sort) {
        case 'stars':
          projects = projects.sort((a, b) => b.stars - a.stars);
          break;
        case 'updated':
          // 模拟按更新时间排序
          break;
        case 'created':
          // 模拟按创建时间排序
          break;
        case 'growth':
          projects = projects.sort((a, b) => parseInt(b.change.replace(/[+]/g, '')) - parseInt(a.change.replace(/[+]/g, '')));
          break;
      }
    }

    // 分页
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProjects = projects.slice(startIndex, endIndex);

    return {
      projects: paginatedProjects,
      total: projects.length,
      page: pageNum,
      limit: limitNum,
      categories: [
        { name: 'all', label: '全部', count: projects.length },
        { name: 'tts', label: 'TTS', count: 13 },
        { name: 'deepseek', label: 'Deepseek', count: 32 },
        { name: 'stt', label: 'STT', count: 5 },
        { name: 'agent', label: 'Agent', count: 217 },
        { name: 'diffusion', label: 'Stable Diffusion', count: 11 },
        { name: 'chatbot', label: 'Chatbot', count: 39 },
        { name: 'mcp', label: 'MCP', count: 1894 },
      ],
    };
  }

  @Get('search')
  searchProjects(@Query('q') query: string) {
    const projectsData = this.appService.getProjectsData();
    const projects = projectsData.projects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    );

    return {
      projects,
      query,
      total: projects.length,
    };
  }

  @Get('trending')
  getTrendingProjects() {
    const projectsData = this.appService.getProjectsData();
    // 模拟获取趋势项目（按stars增长排序）
    const trendingProjects = projectsData.projects
      .sort((a, b) => parseInt(b.change.replace(/[+]/g, '')) - parseInt(a.change.replace(/[+]/g, '')))
      .slice(0, 10);

    return {
      projects: trendingProjects,
      title: '本周热门项目',
    };
  }

  @Get('categories')
  getCategories() {
    return {
      categories: [
        { id: 'all', name: '热门AI开源项目', count: 3179, description: '最受欢迎的AI开源项目' },
        { id: 'tts', name: 'TTS', count: 13, description: '文本转语音技术项目' },
        { id: 'deepseek', name: 'Deepseek', count: 32, description: 'Deepseek相关项目' },
        { id: 'stt', name: 'STT', count: 5, description: '语音转文本技术项目' },
        { id: 'agent', name: 'Agent', count: 217, description: 'AI智能代理项目' },
        { id: 'diffusion', name: 'Stable Diffusion', count: 11, description: '图像生成模型项目' },
        { id: 'chatbot', name: 'Chatbot', count: 39, description: '聊天机器人项目' },
        { id: 'mcp', name: 'MCP', count: 1894, description: 'Model Context Protocol项目' },
      ],
    };
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    const projectsData = this.appService.getProjectsData();
    const project = projectsData.projects.find(p => p.id.toString() === id);

    if (!project) {
      return { error: 'Project not found' };
    }

    // 模拟详细项目信息
    return {
      ...project,
      fullDescription: '这是一个优秀的AI开源项目，致力于推动人工智能技术的发展和应用。项目采用了最新的技术栈，具有良好的可扩展性和维护性。',
      repository: {
        url: `https://github.com/example/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
        language: 'Python',
        license: 'MIT',
        lastCommit: '2天前',
        contributors: Math.floor(Math.random() * 50) + 5,
        issues: Math.floor(Math.random() * 20) + 1,
        pullRequests: Math.floor(Math.random() * 10) + 1,
      },
      installation: {
        requirements: ['Python 3.8+', 'pip', 'git'],
        commands: [
          'git clone https://github.com/example/repo.git',
          'cd repo',
          'pip install -r requirements.txt',
          'python main.py',
        ],
      },
      features: [
        '高性能算法实现',
        '易于使用的API接口',
        '详细的文档说明',
        '活跃的社区支持',
        '持续的功能更新',
      ],
      documentation: {
        quickStart: '快速开始指南',
        apiReference: 'API参考文档',
        examples: '示例代码',
        tutorials: '教程和指南',
      },
      community: {
        discord: 'Discord社区',
        github: 'GitHub讨论',
        twitter: 'Twitter动态',
        blog: '官方博客',
      },
      stats: {
        stars: project.stars,
        forks: Math.floor(project.stars * 0.2),
        watchers: Math.floor(project.stars * 0.1),
        downloads: `${Math.floor(Math.random() * 1000) + 100}K`,
        weeklyGrowth: project.change,
      },
    };
  }
}
