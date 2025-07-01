import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import McpHeader from '../components/mcp/McpHeader';
import McpServiceCard from '../components/mcp/McpServiceCard';
import PaginationControls from '../components/common/PaginationControls';

// Interfaces
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

interface TagPageData {
  tagName: string;
  tagSlug: string;
  services: ServiceData[];
  availableLanguages: string[];
  availableSortOptions: { value: string; label: string }[];
  selectedLang?: string;
  selectedVerifiedStatus?: string; // 'true', 'false', or undefined for 'all'
  selectedSort?: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

const McpTagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState<TagPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentLang = searchParams.get('lang') || '';
  const currentVerified = searchParams.get('verified') || '';
  const currentSort = searchParams.get('sort') || '';


  useEffect(() => {
    if (!tagSlug) return;

    const fetchTagPageData = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (currentLang) params.set('lang', currentLang);
      if (currentVerified) params.set('verified', currentVerified);
      if (currentSort) params.set('sort', currentSort);
      params.set('page', String(currentPage));
      // params.set('limit', '10'); // Example limit

      try {
        const response = await fetch(`/api/mcp/tag/${tagSlug}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TagPageData = await response.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching tag page data:", error);
        setPageData(null); // Set to null or an error state to indicate failure
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagPageData();
  }, [tagSlug, currentPage, currentLang, currentVerified, currentSort, searchParams]);

  const handleFilterChange = (paramName: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
        newParams.set(paramName, value);
    } else {
        newParams.delete(paramName);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    navigate(`/mcp/tag/${tagSlug}?${newParams.toString()}`, { replace: true });
  };


  if (isLoading) {
    return <Layout><div className="mcp-page-container"><McpHeader /><p style={{ textAlign: 'center', padding: '40px' }}>Loading services for tag: {tagSlug}...</p></div></Layout>;
  }

  if (!pageData) {
    return <Layout><div className="mcp-page-container"><McpHeader /><p style={{ textAlign: 'center', padding: '40px' }}>Could not load data for tag: {tagSlug}.</p></div></Layout>;
  }

  const { tagName, services, availableLanguages, availableSortOptions, selectedLang, selectedVerifiedStatus, selectedSort, pagination } = pageData;
  const paginationBaseUrl = `/mcp/tag/${tagSlug}?${searchParams.toString().replace(/&?page=\d+/, '')}`;


  return (
    <Layout>
      <div className="mcp-page-container">
        <McpHeader />
        <section className="mcp-section">
          <h1 className="mcp-section-title">MCP Services for: {tagName}</h1>

          {availableLanguages.length > 0 && (
            <div className="mcp-filters-bar">
              <div className="mcp-filter-group">
                <span className="mcp-filter-label">Language/Tech:</span>
                <ul className="mcp-language-filters">
                  <li>
                    <Link
                        to={`/mcp/tag/${tagSlug}?verified=${selectedVerifiedStatus || ''}&sort=${selectedSort || ''}&page=1`}
                        className={!selectedLang ? 'active-filter' : ''}
                    >
                       All
                    </Link>
                  </li>
                  {availableLanguages.map(lang => (
                    <li key={lang}>
                      <Link
                        to={`/mcp/tag/${tagSlug}?lang=${encodeURIComponent(lang)}&verified=${selectedVerifiedStatus || ''}&sort=${selectedSort || ''}&page=1`}
                        className={selectedLang === lang ? 'active-filter' : ''}
                      >
                        {lang}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mcp-filter-group">
                <span className="mcp-filter-label">Status:</span>
                <ul className="mcp-status-filters">
                    <li>
                        <Link to={`/mcp/tag/${tagSlug}?lang=${selectedLang || ''}&sort=${selectedSort || ''}&page=1`} className={!selectedVerifiedStatus ? 'active-filter' : ''}>All</Link>
                    </li>
                    <li>
                        <Link to={`/mcp/tag/${tagSlug}?lang=${selectedLang || ''}&verified=true&sort=${selectedSort || ''}&page=1`} className={selectedVerifiedStatus === 'true' ? 'active-filter' : ''}>Verified</Link>
                    </li>
                    <li>
                        <Link to={`/mcp/tag/${tagSlug}?lang=${selectedLang || ''}&verified=false&sort=${selectedSort || ''}&page=1`} className={selectedVerifiedStatus === 'false' ? 'active-filter' : ''}>Not Verified</Link>
                    </li>
                </ul>
              </div>
              <div className="mcp-filter-group">
                <span className="mcp-filter-label">Sort By:</span>
                 <ul className="mcp-sort-filters">
                    {/* Default / Clear Sort Option */}
                    <li>
                        <Link
                            to={`/mcp/tag/${tagSlug}?lang=${selectedLang || ''}&verified=${selectedVerifiedStatus || ''}&page=1`}
                            className={!selectedSort ? 'active-filter' : ''}
                        >
                            Default
                        </Link>
                    </li>
                    {availableSortOptions.map(opt => (
                        <li key={opt.value}>
                            <Link
                                to={`/mcp/tag/${tagSlug}?lang=${selectedLang || ''}&verified=${selectedVerifiedStatus || ''}&sort=${opt.value}&page=1`}
                                className={selectedSort === opt.value ? 'active-filter' : ''}
                            >
                                {opt.label}
                            </Link>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {services.length > 0 ? (
            <>
              <div className="mcp-service-grid">
                {services.map(service => (
                  <McpServiceCard {...service} key={service.id} />
                ))}
              </div>
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                baseUrl={paginationBaseUrl}
              />
            </>
          ) : (
            <p className="mcp-no-results">
              No MCP services found for "{tagName}" with the current filters.
              Try adjusting your filters or <Link to={`/mcp/tag/${tagSlug}`}>view all services in this category</Link>.
            </p>
          )}
        </section>
      </div>
      {/* CSS for this page is expected to be in mcp-style.css or global styles */}
    </Layout>
  );
};

export default McpTagPage;
