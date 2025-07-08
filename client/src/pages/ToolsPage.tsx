import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Interfaces (consider moving to a common types file)
interface ToolCategory {
  id: string; // or number
  name: string;
  icon?: string;
  count?: number;
  active?: boolean;
}

interface Tool {
  id: string; // or number
  name: string;
  category: string;
  icon: string;
  description: string;
  rating?: number; // Assuming rating is 0-5
  stars?: number; // Or directly use rating
  features?: string[];
  visitors?: string;
  change?: string;
  isFavorited?: boolean; // For client-side favorite state
}

interface SidebarTrendTool {
    id: string;
    name: string;
    icon: string;
    change: string;
}

interface SidebarNewsItem {
    id: string;
    title: string;
    time: string;
}


// Placeholder Data
const placeholderCategories: ToolCategory[] = [
  { id: 'all', name: '全部', icon: '📱', count: 200, active: true },
  { id: 'chatbot', name: '智天机器人', icon: '🤖', count: 50 },
  { id: 'search', name: 'AI搜索', icon: '🔍', count: 30 },
];

const placeholderTools: Tool[] = [
  { id: '1', name: 'Awesome AI Tool', category: '智天机器人', icon: 'https://via.placeholder.com/48', description: 'This is a great AI tool that does many things.', rating: 4.5, features: ['免费试用', 'API接口'], visitors: '1.2K', change: '+10%', isFavorited: false },
  { id: '2', name: 'Productivity Booster', category: 'AI搜索', icon: 'https://via.placeholder.com/48', description: 'Boost your productivity with this amazing search AI.', rating: 4.0, features: ['多语言'], visitors: '800', change: '+5%', isFavorited: true  },
];

const placeholderTrendingTools: SidebarTrendTool[] = [
    {id: 't1', name: 'ChatGPT', icon: 'https://ext.same-assets.com/155488376/946268843.jpeg', change: '+158%'},
    {id: 't2', name: 'Claude 4', icon: 'https://ext.same-assets.com/155488376/614836080.jpeg', change: '+92%'}
];

const placeholderSidebarNews: SidebarNewsItem[] = [
    {id: 'n1', title: 'DeepSeek R1 正式开源', time: '2小时前'},
    {id: 'n2', title: 'GPT-5 预计明年发布', time: '5小时前'}
];


const ToolsPage: React.FC = () => {
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [trendingTools, setTrendingTools] = useState<SidebarTrendTool[]>([]);
  const [sidebarNews, setSidebarNews] = useState<SidebarNewsItem[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalToolsCount, setTotalToolsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);


  useEffect(() => {
    const fetchToolsData = async (page: number, loadMore = false) => {
        if (loadMore) setIsLoadingMore(true);
        else setIsLoading(true);

        try {
        const params = new URLSearchParams({
            category: activeCategory,
            sort: sortOrder,
            page: String(page),
            limit: '10' // Or make limit configurable
        });
        const response = await fetch(`/api/tools-page-data?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setCategories(data.categories.map((cat: ToolCategory) => ({...cat, active: cat.id === activeCategory })));

        if (loadMore) {
            setTools(prevTools => [...prevTools, ...data.tools]);
        } else {
            setTools(data.tools);
        }
        setTrendingTools(data.trendingTools || []);
        setSidebarNews(data.sidebarNews || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalToolsCount(data.pagination?.totalItems || 0);
        setCurrentPage(data.pagination?.currentPage || 1);

        } catch (error) {
        console.error("Failed to fetch tools page data:", error);
        // Handle error state in UI, e.g., show an error message
        } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        }
    };

    fetchToolsData(currentPage, currentPage > 1);
  }, [activeCategory, sortOrder, currentPage]);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to first page when sort order changes
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const toggleViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const toggleFavorite = (toolId: string) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId ? { ...tool, isFavorited: !tool.isFavorited } : tool
      )
    );
    // In a real app, also call API to update favorite status on backend
  };

  // Client-side filtering is removed as filtering is now handled by the backend via API parameters.
  // The 'tools' state will directly contain the filtered and paginated tools from the API.

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header tools-page-header"> {/* Added tools-page-header for specific styles */}
        <div className="section-container">
          <h1 className="page-title">AI工具库</h1>
          <p className="page-subtitle">发现最优秀的AI工具，提升工作效率</p>

          <div className="tools-filters">
            <div className="filter-section">
              <h3>按分类筛选</h3>
              <div className="category-filters">
                {categories.map(cat => (
                  <div
                    className={`category-filter ${cat.active ? 'active' : ''}`} // Use active property from fetched category
                    key={cat.id}
                    onClick={() => handleCategoryFilter(cat.id)}
                  >
                    {cat.icon && <span className="category-icon">{cat.icon}</span>}
                    <span className="category-name">{cat.name}</span>
                    {cat.count && <span className="category-count">{cat.count}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>排序方式</h3>
              <select className="sort-select" value={sortOrder} onChange={handleSortChange}>
                <option value="popularity">按热度排序</option>
                <option value="newest">最新收录</option>
                <option value="rating">按评分排序</option>
                <option value="free">免费优先</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area with sidebar */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>

        {/* Tools Grid Section */}
        <section className="tools-grid-section" style={{gridColumn: '1 / 2'}}>
          <div className="tools-header">
            <div className="tools-count">
              <span>共找到 <strong>{totalToolsCount}</strong> 个AI工具</span>
            </div>
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => toggleViewMode('grid')}>⊞ 网格</button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => toggleViewMode('list')}>☰ 列表</button>
            </div>
          </div>

          {isLoading && !isLoadingMore && <p>Loading tools...</p>}

          <div className={`tools-grid ${viewMode === 'list' ? 'list-view' : ''}`} id="toolsGrid">
            {tools.map(tool => (
              <div className="tool-card-detailed" data-category={tool.category} key={tool.id}>
                <div className="tool-header">
                  <img src={tool.icon} alt={tool.name} className="tool-icon-large" />
                  <div className="tool-basic-info">
                    <h3 className="tool-name">{tool.name}</h3>
                    <p className="tool-category">{tool.category}</p>
                  </div>
                  <div className="tool-rating">
                    <div className="stars">
                      {Array(5).fill(0).map((_, i) => ( (tool.rating && i < Math.floor(tool.rating)) ? '★' : '☆'))}
                    </div>
                    <span className="rating-score">{tool.rating?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>

                <div className="tool-description">
                  <p>{tool.description}</p>
                </div>

                {tool.features && tool.features.length > 0 && (
                  <div className="tool-features">
                    {tool.features.map(feature => <span className="feature-tag" key={feature}>{feature}</span>)}
                  </div>
                )}

                <div className="tool-stats">
                  <div className="stat-item">
                    <span className="stat-label">用户数</span>
                    <span className="stat-value">{tool.visitors || 'N/A'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">增长率</span>
                    <span className={`stat-value ${tool.change?.startsWith('+') ? 'positive' : ''}`}>{tool.change || 'N/A'}</span>
                  </div>
                </div>

                <div className="tool-actions">
                  <button className="tool-btn primary">立即试用</button>
                  <button className="tool-btn secondary">了解更多</button>
                  <button
                    className="tool-btn icon"
                    title="收藏"
                    onClick={() => toggleFavorite(tool.id)}
                    style={{color: tool.isFavorited ? '#ef4444' : '#495057'}}
                  >
                    {tool.isFavorited ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!isLoading && tools.length === 0 && <p>No tools found matching your criteria.</p>}

          {/* Load More Section */}
          {currentPage < totalPages && !isLoading && (
            <div className="load-more-section">
              <button className="load-more-btn" onClick={handleLoadMore} disabled={isLoadingMore}>
                {isLoadingMore ? '正在加载...' : '加载更多工具'}
              </button>
            </div>
          )}
        </section>

        {/* Tools Sidebar */}
        <aside className="tools-sidebar" style={{gridColumn: '2 / 3', position: 'sticky', top: '100px', height: 'fit-content'}}>
          <div className="sidebar-section">
            <h3 className="sidebar-title">本周热门</h3>
            <div className="trending-tools">
              {trendingTools.map(tool => (
                <div className="trending-tool" key={tool.id}>
                  <img src={tool.icon} alt={tool.name} className="trending-icon" />
                  <div className="trending-info">
                    <h4>{tool.name}</h4>
                    <span className="trending-change">{tool.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">AI新闻</h3>
            <div className="sidebar-news">
              {sidebarNews.map(news => (
                <div className="news-item-small" key={news.id}>
                  <h4>{news.title}</h4>
                  <span className="news-time">{news.time}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      {/* Note: The <style> and <script> blocks from tools.hbs should be handled appropriately.
          CSS to a global/scoped file, JS logic integrated into React component state and event handlers.
      */}
    </Layout>
  );
};

export default ToolsPage;
