import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Interfaces
interface ProjectStatCard {
  id: string;
  number: string;
  label: string;
}

interface ProjectCategoryTab {
  id: string;
  name: string;
  icon: string;
  count: number;
  active?: boolean;
}

interface Project {
  id: string;
  rank?: string | number;
  avatarLetter?: string; // Or image URL
  name: string;
  description: string;
  tags: string[];
  stars: number | string;
  growth: string; // e.g., "+68"
  forks: number | string;
  category: string; // To match category id from tabs
}

interface ProjectGroup {
    categoryName: string;
    categoryDesc: string;
    projects: Project[];
}


// Placeholder Data
const placeholderStats: ProjectStatCard[] = [
  { id: 'ps1', number: '3,200+', label: '开源项目' },
  { id: 'ps2', number: '85K+', label: 'GitHub Stars' },
  { id: 'ps3', number: '120+', label: '活跃项目' },
  { id: 'ps4', number: '50+', label: '技术分类' },
];

const placeholderCategoryTabs: ProjectCategoryTab[] = [
  { id: 'all', name: '热门项目', icon: '🏆', count: 3179, active: true },
  { id: 'tts', name: 'TTS', icon: '🎵', count: 13 },
  { id: 'deepseek', name: 'Deepseek', icon: '🧠', count: 32 },
  { id: 'stt', name: 'STT', icon: '🎤', count: 5 },
];

const placeholderProjectsByCategory: ProjectGroup[] = [
    {
        categoryName: '热门AI开源项目',
        categoryDesc: '3179 repositories',
        projects: [
            { id: 'p1', rank: '#1', avatarLetter: 'M', name: 'MLLMCelltype', description: '机器学习细胞类型分析工具...', tags: ['Python', 'ML'], stars: 68, growth: '+68', forks: 12, category: 'all' },
            { id: 'p2', rank: '#2', avatarLetter: 'M', name: 'Mcp Containers', description: '容器化MCP部署解决方案...', tags: ['Docker', 'K8s'], stars: 50, growth: '+50', forks: 8, category: 'all' },
        ]
    },
    {
        categoryName: 'TTS 语音合成',
        categoryDesc: '13 repositories',
        projects: [
            { id: 'p3', rank: '#1', avatarLetter: 'B', name: 'Bert VITS2 MNN', description: '基于BERT的语音合成模型...', tags: ['Python', 'TTS'], stars: 15, growth: '+15', forks: 3, category: 'tts' },
        ]
    }
];


const ProjectsPage: React.FC = () => {
  const [stats, setStats] = useState<ProjectStatCard[]>(placeholderStats);
  const [categoryTabs, setCategoryTabs] = useState<ProjectCategoryTab[]>(placeholderCategoryTabs);
  const [projectGroups, setProjectGroups] = useState<ProjectGroup[]>(placeholderProjectsByCategory);

  const [activeMainCategory, setActiveMainCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('stars');
  const [timeFilter, setTimeFilter] = useState<string>('today'); // Default to 'today' or 'all'
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [projects, setProjects] = useState<Project[]>([]); // Flat list of projects for current view
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);


  const fetchProjectsData = async (page: number, loadMore = false) => {
    if (loadMore) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const params = new URLSearchParams({
        category: activeMainCategory,
        sort: sortOption,
        time: timeFilter,
        page: String(page),
        limit: '5' // Or make limit configurable
      });
      const response = await fetch(`/api/projects-page-data?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setStats(data.stats || []);
      setCategoryTabs(data.categoryTabs.map((tab:ProjectCategoryTab) => ({...tab, active: tab.id === activeMainCategory })) || placeholderCategoryTabs);

      if (loadMore) {
        setProjects(prevProjects => [...prevProjects, ...data.projects]);
      } else {
        setProjects(data.projects || []);
      }
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      // setProjectGroups might not be needed if API returns flat `projects` list based on filters
      // If API returns grouped structure for 'all', then update projectGroups

    } catch (error) {
      console.error("Failed to fetch projects page data:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjectsData(1); // Fetch initial data
  }, [activeMainCategory, sortOption, timeFilter]);


  const handleMainCategoryClick = (categoryId: string) => {
    setActiveMainCategory(categoryId);
    setCurrentPage(1); // Reset page
    // fetchProjectsData(1) will be called by useEffect
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset page
    // fetchProjectsData(1) will be called by useEffect
  };

  const handleTimeFilterClick = (filter: string) => {
    // Map UI display "今日" to "today" for API consistency if needed, or handle in API
    const apiFilter = filter === '今日' ? 'today' : filter;
    setTimeFilter(apiFilter);
    setCurrentPage(1); // Reset page
    // fetchProjectsData(1) will be called by useEffect
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      fetchProjectsData(currentPage + 1, true);
    }
  };

  // Determine which projects to display.
  // If activeMainCategory is 'all', we might want to show grouped projects.
  // For now, this component will display the flat `projects` list fetched from API.
  // The HBS template had a more complex display for "all" where it showed multiple category sections.
  // This simplified version will show one list based on current filters.
  // To replicate HBS for "all", `fetchProjectsData` would need to fetch all categories' top projects,
  // or `projectGroups` state would be populated and used for rendering.
  // For now, we use the `projects` state which contains the filtered/paginated list.

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header projects-page-header">
        <div className="section-container">
          <h1 className="page-title">AI开源项目</h1>
          <p className="page-subtitle">探索最新的AI开源项目，推动技术创新</p>
          <div className="projects-stats">
            {stats.map(stat => (
              <div className="stat-card" key={stat.id}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="categories-navigation">
        <div className="section-container">
          <div className="category-tabs">
            {categoryTabs.map(tab => (
              <div
                className={`category-tab ${tab.active ? 'active' : ''}`}
                key={tab.id}
                onClick={() => handleMainCategoryClick(tab.id)}
                data-category={tab.id}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.name}</span>
                <span className="tab-count">{tab.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects List Section */}
      <section className="projects-list-section">
        <div className="section-container">
          <div className="projects-header">
            <div className="sort-options">
              <label>排序方式：</label>
              <select className="sort-select" value={sortOption} onChange={handleSortChange}>
                <option value="stars">按 Stars 排序</option>
                <option value="updated">最近更新</option>
                <option value="created">最新创建</option>
                <option value="growth">增长最快</option>
              </select>
            </div>
            <div className="time-filter">
              {['今日', '本周', '本月', '全部'].map(tf => (
                <button
                  key={tf}
                  className={`time-btn ${timeFilter === tf.toLowerCase() || (tf ==='今日' && timeFilter === 'today') ? 'active' : ''}`} // Simplified mapping
                  onClick={() => handleTimeFilterClick(tf.toLowerCase())}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {isLoading && !isLoadingMore && <p>Loading projects...</p>}
            {!isLoading && projects.length === 0 && <p>No projects found matching your criteria.</p>}

            {/* Render a single list of projects based on the `projects` state */}
            {/* The HBS grouped display for "all" is not replicated here yet.
                This renders a flat list based on current filters.
            */}
            {projects.map(project => (
              <div className="project-item" key={project.id}>
                <div className="project-rank">{project.rank}</div>
                <div className="project-avatar">
                  {/* Assuming avatarLetter for simplicity, could be an img tag */}
                  <span className="avatar-letter">{project.avatarLetter || project.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="project-stats">
                  <div className="stat-item">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">{project.stars}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📈</span>
                    <span className="stat-value growth">{project.growth}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🍴</span>
                    <span className="stat-value">{project.forks}</span>
                  </div>
                </div>
                <div className="project-actions">
                  <button className="action-btn primary">查看详情</button>
                  <button className="action-btn secondary">GitHub</button>
                </div>
              </div>
            ))}
          </div>

          {currentPage < totalPages && !isLoading && (
            <div className="load-more-section">
              <button className="load-more-btn" onClick={handleLoadMore} disabled={isLoadingMore}>
                {isLoadingMore ? '正在加载...' : '加载更多项目'}
              </button>
          </div>
        </div>
      </section>
      {/* Note: CSS and JS from projects.hbs need to be handled */}
    </Layout>
  );
};

export default ProjectsPage;
