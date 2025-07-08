// Sample News Seed Data

export interface SeedNews {
  title: string;
  excerpt: string;
  content: string; // Can be Markdown or HTML string
  categorySlug: string; // Slug of the category this news belongs to
  publishedAt: Date;
  imageUrl?: string;
  tags?: string[];
  author?: string;
  sourceUrl?: string;
  isFeatured?: boolean;
  views?: number;
}

export const newsSeed: SeedNews[] = [
  {
    title: '谷歌发布最新AI模型 Gemini 1.5 Pro',
    excerpt:
      '谷歌近日发布了其最新的多模态AI模型Gemini 1.5 Pro，在长上下文理解方面取得了突破性进展，能够处理高达100万个token。',
    content:
      '<p>谷歌在AI领域再次取得重大突破，正式发布了Gemini 1.5 Pro模型。该模型是谷歌迄今为止能力最强的多模态模型之一，特别在长上下文窗口理解方面表现出色。</p><p>Gemini 1.5 Pro能够一次性处理海量信息，包括1小时的视频、11小时的音频、超过3万行代码或超过70万个单词的文本。这一能力使其在分析、分类和总结大规模内容时具有显著优势。</p><p>谷歌表示，Gemini 1.5 Pro在多个基准测试中均表现优异，其性能可与更大规模的Gemini Ultra相媲美，同时计算资源消耗更低。</p>',
    categorySlug: 'ai-xiezuo', // Example: Could be "ai-技术进展" or similar if that category exists
    publishedAt: new Date('2024-02-15T09:00:00Z'),
    imageUrl:
      'https://img.aibase.com/static/common/20240216095354_46972.jpeg?imageView2/1/w/320/h/180/q/75',
    tags: ['Google', 'Gemini', 'AI Model', 'LLM'],
    author: 'AIbase News Desk',
    isFeatured: true,
    views: 1250,
  },
  {
    title: 'OpenAI推出Sora：文本到视频生成的新里程碑',
    excerpt:
      'OpenAI发布了其最新的文本到视频生成模型Sora。Sora能够根据文本指令创建长达一分钟的逼真、富有想象力的高清视频。',
    content:
      '<p>OpenAI在视频生成领域迈出了重要一步，推出了名为Sora的AI模型。Sora能够将用户的文本描述转化为高质量的视频片段，长度可达60秒。</p><p>该模型不仅能生成具有多个角色、特定类型运动以及精确主题和背景细节的复杂场景，还能理解物体在物理世界中的存在方式。OpenAI强调，Sora在语言理解的深度使其能够准确地解释提示并生成表达生动情感的引人入胜的角色。</p><p>目前，Sora首先提供给红队测试人员以评估潜在风险和危害，同时也向部分视觉艺术家、设计师和电影制作人开放，以获取反馈并改进模型。</p>',
    categorySlug: 'ai-shipin', // Example: Could be "ai-产品发布"
    publishedAt: new Date('2024-02-16T10:00:00Z'),
    imageUrl:
      'https://img.aibase.com/static/common/20240216101934_96163.jpeg?imageView2/1/w/320/h/180/q/75',
    tags: ['OpenAI', 'Sora', 'Text-to-Video', 'Generative AI'],
    author: 'AIbase News Desk',
    isFeatured: true,
    views: 2300,
  },
  // Add more news items as needed
];
