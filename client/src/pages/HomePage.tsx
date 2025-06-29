import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Define interfaces for the data structures
interface NewsItem {
  id: number;
  title: string;
  date: string; // Or Date
  category?: string;
  image?: string;
}

interface HotTool {
  id: number;
  name: string;
  description: string;
  visitors: string; // This was string in service, e.g., "1020" or "13%"
  change: string;
  icon: string;
  category: string;
  rank?: number; // Added for sorting/display if not present in data
}

interface CategoryInfo {
  id: number;
  name: string;
  icon: string;
  count: number;
  active?: boolean; // For UI state
}

interface FeaturedGuide {
  id: number;
  title: string;
  views: number;
  image: string;
  category: string;
}

interface OpenSourceProject {
    id: number;
    name: string;
    stars: number;
    change: string;
    description: string;
    category: string;
}


const HomePage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [hotTools, setHotTools] = useState<HotTool[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [featuredGuides, setFeaturedGuides] = useState<FeaturedGuide[]>([]);
  // const [openSourceProjects, setOpenSourceProjects] = useState<OpenSourceProject[]>([]); // For AI开源项目 section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await fetch('/api/home-data/news');
        setNewsItems(await newsResponse.json());

        const toolsResponse = await fetch('/api/home-data/hot-tools');
        // Add rank to hot tools based on order, as original HBS template used @index
        const toolsData = await toolsResponse.json();
        setHotTools(toolsData.map((tool: HotTool, index: number) => ({ ...tool, rank: index + 1 })));


        const categoriesResponse = await fetch('/api/home-data/categories');
        // Set first category as active, similar to HBS
        const catData = await categoriesResponse.json();
        if (catData.length > 0) {
            catData[0].active = true;
        }
        setCategories(catData);

        const guidesResponse = await fetch('/api/home-data/featured-guides');
        setFeaturedGuides(await guidesResponse.json());

        // const projectsResponse = await fetch('/api/home-data/open-source-projects');
        // setOpenSourceProjects(await projectsResponse.json());

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
        // Handle error state appropriately in UI
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {/* 英雄区域 */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">5月29日 AI头条</div>
              <h1 className="hero-title">正式开源！DeepSeek-R1-0528震撼发布，性能直逼OpenAI o3，免费API已上线</h1>
              <button className="hero-btn">查看头条</button>
            </div>
            <div className="hero-image">
              <img src="https://ext.same-assets.com/155488376/4141911314.jpeg" alt="DeepSeek" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 新鲜AI资讯 */}
      <section className="news-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">新鲜AI资讯</h2>
            <p className="section-subtitle">实时更新AI行业的最新资讯</p>
            <div className="section-tabs">
              <span className="tab active">最新</span>
              <span className="tab">视频</span>
              <span className="tab">热门</span>
            </div>
          </div>

          <div className="news-grid">
            {newsItems.length > 0 ? (
              newsItems.map((item) => (
                <article className="news-item" key={item.id}>
                  <div className="news-meta">
                    <time className="news-date">{item.date}</time>
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                </article>
              ))
            ) : (
              <p>Loading news...</p>
            )}
          </div>
        </div>
      </section>

      {/* 热门AI榜单 */}
      <section className="ranking-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">热门AI榜单</h2>
            <div className="ranking-tabs">
              <div className="ranking-tab active">
                <span className="tab-icon">🔥</span>
                <span className="tab-text">最新收录推荐</span>
                <small className="tab-desc">全面展示优质AI产品推荐</small>
              </div>
              <div className="ranking-tab">
                <span className="tab-icon">📈</span>
                <span className="tab-text">周流量暴涨升级</span>
                <small className="tab-desc">周流量暴涨的AI产品排行</small>
              </div>
              <div className="ranking-tab">
                <span className="tab-icon">📊</span>
                <span className="tab-text">月流量暴涨升级</span>
                <small className="tab-desc">月流量暴涨AI产品排行</small>
              </div>
            </div>
          </div>

          <div className="tools-grid">
            {hotTools.length > 0 ? (
              hotTools.map((tool) => (
                <div className="tool-card" key={tool.id}>
                  <div className="tool-rank">{tool.rank}</div>
                  <div className="tool-icon">
                    <img src={tool.icon} alt={tool.name} className="tool-icon-img" />
                  </div>
                  <div className="tool-info">
                    <h4 className="tool-name">{tool.name}</h4>
                    <p className="tool-desc">{tool.description}</p>
                  </div>
                  <div className="tool-stats">
                    <div className="tool-visitors">{tool.visitors}</div>
                    {/* Determine class for change, e.g. positive/negative based on data */}
                    <div className={`tool-change ${tool.change && tool.change.startsWith('+') ? 'positive' : tool.change && tool.change.startsWith('-') ? 'negative' : ''}`}>{tool.change}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading hot tools...</p>
            )}
          </div>
        </div>
      </section>

      {/* AI分类榜 */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">热门AI分类榜</h2>
            <p className="section-subtitle">展现各个AI类头技术产品专属的流量变化</p>
          </div>

          <div className="categories-nav">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div className={`category-tab ${category.active ? 'active' : ''}`} key={category.id}>
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>

          <div className="category-header">
            <h3>中文 TOP ：</h3>
          </div>

          {/* Placeholder for category tools grid - this part had static examples in HBS */}
          <div className="category-tools-grid">
            <div className="category-tool featured">
              <div className="tool-content">
                <div className="tool-label github">视频生成</div>
                <h4>SkyReels-V2</h4>
                <p>全球首个无需时长限制的视频生成AI系统，开启移动原创视频时代</p>
                <div className="tool-metrics">
                  <span className="metric">👥 82.9M</span>
                  <span className="metric negative">❤️ -25.45 %</span>
                </div>
              </div>
            </div>
            {/* Add more static or dynamic tools here as needed */}
          </div>
        </div>
      </section>

      {/* AI开源项目 */}
      <section className="projects-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">热门AI开源项目</h2>
            <p className="section-subtitle">为你提供最全面的AI开源项目库</p>
          </div>
          {/* This section had a complex structure in HBS. For now, a simplified version or placeholder. */}
          <div className="projects-categories">
            <div className="project-category">
              <h3>热门AI开源项目</h3>
              <p>3179 repositories</p>
              <div className="project-list">
                <div className="project-item">
                  <span className="project-rank">1</span>
                  <span className="project-name">M MLLMCelltype</span>
                  <span className="project-stars">▲ 68</span>
                </div>
              </div>
            </div>
            {/* Add more categories as needed */}
          </div>
        </div>
      </section>

      {/* 最新实现指南 */}
      <section className="guides-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">最新实现指南</h2>
            <p className="section-subtitle">获取最新AI循环次数或实操案例</p>
          </div>

          <div className="guides-grid">
            {featuredGuides.length > 0 ? (
              featuredGuides.map((guide) => (
                <div className="guide-card" key={guide.id}>
                  <div className="guide-image">
                    <img src={guide.image} alt={guide.title} className="guide-img" />
                  </div>
                  <div className="guide-content">
                    <h4 className="guide-title">{guide.title}</h4>
                    <div className="guide-stats">
                      <span className="guide-views">閲读量: {guide.views}</span>
                      <span className="guide-category">{guide.category}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading featured guides...</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
