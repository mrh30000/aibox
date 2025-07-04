import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Interfaces for data structures (can be moved to a common types file)
interface NewsItem {
  id: string; // Changed from number to string to match backend DTO
  title: string;
  date: string; // Backend sends ISO string, which is fine
  category?: string;
  image?: string;
  excerpt?: string; // Added for news card
  views?: string | number;
  likes?: string | number;
}

interface HotTool {
    id: number;
    name: string;
    description: string;
    icon: string;
}

// Placeholder data - to be replaced with API calls
const placeholderNews: NewsItem[] = [
  { id: 1, title: 'AI News Title 1', date: '2024-06-05', category: 'AI头条', image: 'https://via.placeholder.com/200x150', excerpt: 'This is a sample excerpt for the news item, showcasing the latest developments.', views: '1.2K', likes: 56 },
  { id: 2, title: 'Another AI Breakthrough', date: '2024-06-04', category: '技术进展', image: 'https://via.placeholder.com/200x150', excerpt: 'Details about a significant advancement in AI technology and its potential impact.', views: '2.5K', likes: 120 },
];

const placeholderRecommendedTools: HotTool[] = [
    { id: 1, name: 'ChatGPT', description: '智能对话助手', icon: 'https://ext.same-assets.com/155488376/946268843.jpeg'},
    { id: 2, name: 'Claude 4', description: '高级AI助手', icon: 'https://ext.same-assets.com/155488376/614836080.jpeg'},
];

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(placeholderNews);
  const [recommendedTools, setRecommendedTools] = useState<HotTool[]>(placeholderRecommendedTools);
  // TODO: Add states for filters, search, pagination, topics

  // useEffect(() => {
  //   // Fetch actual news items, topics, recommended tools etc.
  //   // Example:
  //   // const fetchNews = async () => {
  //   //   const response = await fetch('/api/news-page/news-items?page=1&limit=10'); // Adjust API endpoint
  //   //   const data = await response.json();
  const [popularTopics, setPopularTopics] = useState<{id: string, name: string}[]>([]);
  // TODO: Add states for filters, search, pagination

  useEffect(() => {
    const fetchNewsPageData = async () => {
      try {
        const response = await fetch('/api/news/page-data'); // Corrected API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNewsItems(data.newsItems || []);
        setRecommendedTools(data.recommendedTools || []);
        setPopularTopics(data.popularTopics || []);
        // TODO: set pagination data if available from API (currentPage, totalPages)
      } catch (error) {
        console.error("Failed to fetch news page data:", error);
        // Set empty arrays or show error message in UI
        setNewsItems([]);
        setRecommendedTools([]);
        setPopularTopics([]);
      }
    };
    fetchNewsPageData();
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header">
        <div className="section-container">
          <h1 className="page-title">AI资讯</h1>
          <p className="page-subtitle">实时更新AI行业的最新资讯</p>

          <div className="news-filters">
            <div className="filter-tabs">
              <span className="filter-tab active">全部</span>
              <span className="filter-tab">AI头条</span>
              <span className="filter-tab">产品发布</span>
              <span className="filter-tab">技术进展</span>
              <span className="filter-tab">行业动态</span>
            </div>

            <div className="news-search">
              <input type="text" placeholder="搜索资讯..." className="news-search-input" />
              <button className="news-search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
        {/* News List Section */}
        <section className="news-list-section" style={{ gridColumn: '1 / 2' }}>
          {/* The parent div with grid styles is outside this section now */}
          {/* <div className="section-container"> Removed, as max-width is on parent now */}
            <div className="news-list">
              {newsItems.map(item => (
                <article className="news-card" key={item.id}>
                  {item.image && (
                    <div className="news-image">
                      <img src={item.image} alt={item.title} className="news-img" />
                    </div>
                  )}
                  <div className="news-content">
                    <div className="news-meta">
                      {item.category && <span className="news-category">{item.category}</span>}
                      <time className="news-date">{item.date}</time>
                    </div>
                    <h2 className="news-title">{item.title}</h2>
                    {item.excerpt && <p className="news-excerpt">{item.excerpt}</p>}
                    <div className="news-actions">
                      <button className="news-read-btn">阅读全文</button>
                      <div className="news-stats">
                        {item.views && <span className="news-views">👁 {item.views}</span>}
                        {item.likes && <span className="news-likes">❤️ {item.likes}</span>}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn" disabled>上一页</button>
              <div className="pagination-numbers">
                <span className="pagination-number active">1</span>
                <span className="pagination-number">2</span>
                <span className="pagination-number">3</span>
                <span className="pagination-dots">...</span>
                <span className="pagination-number">10</span>
              </div>
              <button className="pagination-btn">下一页</button>
            </div>
          {/* </div> */}
        </section>

        {/* News Sidebar */}
        <aside className="news-sidebar" style={{ gridColumn: '2 / 3', position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="sidebar-section">
            <h3 className="sidebar-title">热门话题</h3>
            <div className="topic-tags">
              {popularTopics.map(topic => (
                <span className="topic-tag" key={topic.id}>{topic.name}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">推荐工具</h3>
            <div className="recommended-tools">
              {recommendedTools.map(tool => (
                <div className="recommended-tool" key={tool.id}>
                  <img src={tool.icon} alt={tool.name} className="tool-icon-small" />
                  <div className="tool-info-small">
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      {/* Note: The <style> block from news.hbs should be moved to a global CSS file
          or handled with CSS Modules / CSS-in-JS.
          For example, its content can be added to public/css/style.css or a new public/css/news-page.css
          and linked in client/index.html
      */}
    </Layout>
  );
};

export default NewsPage;
