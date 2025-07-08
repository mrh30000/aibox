import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import McpHeader from '../components/mcp/McpHeader';
import McpHero from '../components/mcp/McpHero';
import McpInfoCards from '../components/mcp/McpInfoCards';
import McpServiceCard from '../components/mcp/McpServiceCard';
import McpTutorialCard from '../components/mcp/McpTutorialCard';
import McpFaq from '../components/mcp/McpFaq';

// Interfaces for McpLandingPage data structure
// These should match the structure provided by the backend API
interface HeroData {
  title: string;
  subtitle?: string;
}

interface InfoCardData {
  title: string;
  description: string;
  linkUrl?: string;
  isComingSoon?: boolean;
  isExternalLink?: boolean;
}

interface ServiceData {
  id: string | number;
  externalServiceUrl: string;
  imageUrl?: string;
  name: string;
  isVerified?: boolean;
  description: string;
  languageOrTech?: string;
  userCountOrStars?: number | string;
  rating?: number | string;
}

interface CategorizedServices {
  categoryName: string;
  categorySlug: string; // for "View All" link
  services: ServiceData[];
  hasMore?: boolean;
}

interface TutorialData {
  id: string | number;
  externalTutorialUrl: string;
  imageUrl?: string;
  title: string;
  summary: string;
  publishDate?: string | Date;
  viewCount?: number | string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface McpPageData {
  hero: HeroData;
  infoCards: InfoCardData[];
  featuredServices: ServiceData[];
  recentServices: ServiceData[];
  categorizedServices: CategorizedServices[];
  tutorials: TutorialData[];
  faqItems: FaqItem[];
  initialSearchTerm?: string; // If search term needs to be passed to hero
}

// Placeholder for the full page data
const initialPageData: McpPageData = {
    hero: { title: 'MCP服务中心', subtitle: '探索、集成并管理您的微组件化服务。' },
    infoCards: [
        { title: '什么是MCP？', description: '了解MCP架构的核心概念。', linkUrl: '/mcp/docs/what-is-mcp' },
        { title: '快速入门指南', description: '几分钟内集成您的第一个MCP服务。', linkUrl: '/mcp/docs/quickstart' },
        { title: '服务市场', description: '浏览可用的MCP服务。', linkUrl: '/mcp/services', isComingSoon: false },
        { title: '开发者文档', description: '深入了解MCP SDK和API。', linkUrl: '/mcp/docs/developer', isComingSoon: true },
    ],
    featuredServices: [
        { id: 'fs1', name: '用户认证服务', description: '提供安全的OAuth2和JWT认证流程。', externalServiceUrl: '#', languageOrTech: 'Node.js', userCountOrStars: 1200, rating: 4.8, isVerified: true, imageUrl: 'https://via.placeholder.com/100x70?text=Auth' },
        { id: 'fs2', name: '消息推送大师', description: '高可用、低延迟的消息推送服务。', externalServiceUrl: '#', languageOrTech: 'Go', userCountOrStars: '850K', rating: 4.5, imageUrl: 'https://via.placeholder.com/100x70?text=Push' },
    ],
    recentServices: [
        { id: 'rs1', name: 'AI图像分析', description: '先进的图像识别与打标服务。', externalServiceUrl: '#', languageOrTech: 'Python', userCountOrStars: 500, rating: 4.6, imageUrl: 'https://via.placeholder.com/100x70?text=AIImg' },
    ],
    categorizedServices: [
        { categoryName: '数据处理', categorySlug: 'data-processing', services: [
            { id: 'cs1', name: 'ETL数据管道', description: '高效的数据提取、转换和加载服务。', externalServiceUrl: '#', languageOrTech: 'Java', userCountOrStars: 300, rating: 4.2, imageUrl: 'https://via.placeholder.com/100x70?text=ETL' },
          ], hasMore: true
        },
        { categoryName: '人工智能', categorySlug: 'artificial-intelligence', services: [
            { id: 'cs2', name: '自然语言处理套件', description: '文本分析、情感识别、机器翻译。', externalServiceUrl: '#', languageOrTech: 'Python', userCountOrStars: '1M', rating: 4.9, isVerified: true, imageUrl: 'https://via.placeholder.com/100x70?text=NLP' },
          ], hasMore: false
        }
    ],
    tutorials: [
        { id: 't1', title: '集成认证服务到您的应用', summary: '一步步教您如何快速集成用户认证服务。', externalTutorialUrl: '#', publishDate: '2024-05-15', viewCount: '1.5K', imageUrl: 'https://via.placeholder.com/300x180?text=AuthTut' },
    ],
    faqItems: [
        { question: 'MCP服务如何收费？', answer: '大部分MCP服务提供按需付费模式，部分基础服务可能提供免费套餐。详情请查看具体服务的定价页面。' },
        { question: '如何保证服务的可用性？', answer: '我们致力于提供高可用的MCP服务，并设有服务等级协议（SLA）。具体服务的SLA请参考其文档。' }
    ]
};


const McpLandingPage: React.FC = () => {
  const [pageData, setPageData] = useState<McpPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/mcp/landing-page-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching MCP landing page data:", error);
        // Set pageData to null or some error state if needed, to display an error message
        setPageData(null);
        // Optionally set an error state to display an error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Layout><div className="mcp-page-container"><McpHeader /><p style={{textAlign: 'center', padding: '40px'}}>Loading MCP Services...</p></div></Layout>;
  }

  if (!pageData) {
    return <Layout><div className="mcp-page-container"><McpHeader /><p style={{textAlign: 'center', padding: '40px'}}>Failed to load page data.</p></div></Layout>;
  }

  const { hero, infoCards, featuredServices, recentServices, categorizedServices, tutorials, faqItems, initialSearchTerm } = pageData;

  return (
    <Layout>
      <div className="mcp-page-container">
        <McpHeader />
        <McpHero heroData={hero} initialSearchTerm={initialSearchTerm} />
        <McpInfoCards cardsData={infoCards} />

        <section className="mcp-section">
          <h2 className="mcp-section-title">热门推荐MCP服务</h2>
          <div className="mcp-service-grid">
            {featuredServices.map(service => (
              <McpServiceCard {...service} key={service.id} />
            ))}
          </div>
        </section>

        <section className="mcp-section">
          <h2 className="mcp-section-title">最近更新MCP</h2>
          <div className="mcp-service-grid">
            {recentServices.map(service => (
              <McpServiceCard {...service} key={service.id} />
            ))}
          </div>
        </section>

        {categorizedServices.map(categorySection => (
          <section className="mcp-section" key={categorySection.categorySlug}>
            <h2 className="mcp-section-title">{categorySection.categoryName}</h2>
            <div className="mcp-service-grid">
              {categorySection.services.map(service => (
                <McpServiceCard {...service} key={service.id} />
              ))}
            </div>
            {categorySection.hasMore && (
              <div className="mcp-view-all-link">
                {/* Use Link component for internal navigation */}
                <Link to={`/mcp/tag/${categorySection.categorySlug}`}>查看全部 &gt;</Link>
              </div>
            )}
          </section>
        ))}

        <section className="mcp-section mcp-tutorials-section">
          <h2 className="mcp-section-title">MCP使用教程</h2>
          <div className="mcp-tutorial-grid">
            {tutorials.map(tutorial => (
              <McpTutorialCard {...tutorial} key={tutorial.id} />
            ))}
          </div>
          {/* Placeholder for "View All Tutorials" if needed */}
        </section>

        <McpFaq faqData={faqItems} />
      </div>
    </Layout>
  );
};

export default McpLandingPage;
