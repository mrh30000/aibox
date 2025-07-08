import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PaginationControls from '../components/common/PaginationControls'; // Assuming this component exists and is suitable

// Interfaces for data structures
interface NewsItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  image?: string;
  excerpt?: string;
  views?: string | number;
  likes?: string | number;
}

interface HotTool {
    id: number;
    name: string;
    description: string;
    icon: string;
}

interface NewsCategory {
    id: string;
    name: string;
}

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<HotTool[]>([]);
  const [popularTopics, setPopularTopics] = useState<{id: string, name: string}[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsPageData = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
            category: activeCategory,
            q: searchTerm,
            page: String(currentPage),
            limit: '10', // Or make this configurable
        });
        const response = await fetch(`/api/news/page-data?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNewsItems(data.newsItems || []);
        setRecommendedTools(data.recommendedTools || []);
        setPopularTopics(data.popularTopics || []);
        setCategories(data.categories || []); // Assuming API provides categories
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } catch (error) {
        console.error("Failed to fetch news page data:", error);
        setNewsItems([]);
        setRecommendedTools([]);
        setPopularTopics([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsPageData();
  }, [activeCategory, searchTerm, currentPage]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The search term is already in state, useEffect will trigger the fetch
    setCurrentPage(1); // Reset to first page for new search
  };

  const paginationBaseUrl = `/news?category=${activeCategory}&q=${encodeURIComponent(searchTerm)}`;

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header">
        <div className="section-container">
          <h1 className="page-title">AI资讯</h1>
          <p className="page-subtitle">实时更新AI行业的最新资讯</p>

          <div className="news-filters">
            <div className="filter-tabs">
              <span 
                className={`filter-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                全部
              </span>
              {categories.map(cat => (
                 <span 
                    key={cat.id}
                    className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </span>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="news-search">
              <input 
                type="text" 
                placeholder="搜索资讯..." 
                className="news-search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="news-search-btn">🔍</button>
            </form>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
        {/* News List Section */}
        <section className="news-list-section" style={{ gridColumn: '1 / 2' }}>
            {isLoading ? (
                <p>Loading news...</p>
            ) : newsItems.length > 0 ? (
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
                        <time className="news-date">{new Date(item.date).toLocaleDateString()}</time>
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
            ) : (
                <p>No news items found.</p>
            )}

            {/* Pagination */}
            <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={paginationBaseUrl}
            />
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
    </Layout>
  );
};

export default NewsPage;
