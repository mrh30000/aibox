import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import McpHeader from '../components/mcp/McpHeader';
import McpHero from '../components/mcp/McpHero';
import McpServiceCard from '../components/mcp/McpServiceCard';
import PaginationControls from '../components/common/PaginationControls'; // Import the new component

// Interfaces (should match McpLandingPage and McpServiceCard if possible)
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

interface SearchResultsData {
  services: ServiceData[];
  searchTerm: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

// Placeholder for hero data override if needed by McpHero
const heroDataForSearch = {
    title: "MCP 服务搜索", // This title can be dynamic or fixed
    // subtitle: "Find the MCP services you need." // Optional
};

const McpSearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const currentPageQuery = searchParams.get('page') || '1';

  const [services, setServices] = useState<ServiceData[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: parseInt(currentPageQuery, 10),
    totalPages: 1,
    totalItems: 0,
    limit: 10, // Default limit, should match API
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actualSearchTerm, setActualSearchTerm] = useState(searchTerm);


  useEffect(() => {
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    setActualSearchTerm(query);
    setIsLoading(true);

    // Simulate API call
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/mcp/search?q=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SearchResultsData = await response.json();
        setServices(data.services || []);
        setPagination(data.pagination || { currentPage: page, totalPages: 1, totalItems: 0, limit: 10 });
        setActualSearchTerm(data.searchTerm); // API confirms the search term
      } catch (error) {
        console.error("Error fetching search results:", error);
        setServices([]);
        setPagination({ currentPage: page, totalPages: 1, totalItems: 0, limit: 10 });
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if query is present or if the page number changes for an existing query.
    // If query is empty, don't fetch, just show empty results.
    if (query) {
        fetchSearchResults();
    } else {
        setIsLoading(false);
        setServices([]);
        setPagination({ currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 });
        setActualSearchTerm(''); // Clear actual search term if query is empty
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // searchParams includes 'q' and 'page'


  const paginationBaseUrl = `/mcp/search-results?q=${encodeURIComponent(actualSearchTerm)}`;

  return (
    <Layout>
      <div className="mcp-page-container">
        <McpHeader />
        <McpHero heroData={heroDataForSearch} initialSearchTerm={actualSearchTerm} />

        <section className="mcp-section">
          <h1 className="mcp-section-title">
            Search Results for: "{actualSearchTerm}"
            {!isLoading && <span className="mcp-search-result-count">({pagination.totalItems} found)</span>}
          </h1>

          {isLoading ? (
            <p style={{textAlign: 'center'}}>Loading search results...</p>
          ) : services.length > 0 ? (
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
            <div className="mcp-no-results">
              <p>No MCP services found for "<strong>{actualSearchTerm}</strong>".</p>
              <p>Suggestions:</p>
              <ul>
                <li>Make sure all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
          )}
        </section>
      </div>
      {/* CSS for this page is expected to be in mcp-style.css or global styles */}
    </Layout>
  );
};

export default McpSearchResultsPage;
