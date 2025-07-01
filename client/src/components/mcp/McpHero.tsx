import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface McpHeroProps {
  heroData: {
    title: string;
    subtitle?: string;
  };
  initialSearchTerm?: string;
}

const McpHero: React.FC<McpHeroProps> = ({ heroData, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/mcp/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Optionally, navigate to a generic search or MCP landing page if search term is empty
      navigate('/mcp/search-results');
    }
  };

  return (
    <section className="mcp-hero-section">
      <div className="mcp-hero-content">
        <h1>{heroData.title}</h1>
        <p className="mcp-hero-subtitle">
          {heroData.subtitle || 'Discover and integrate MCP services easily.'}
        </p>
        <form onSubmit={handleSearchSubmit} className="mcp-search-bar-container">
          <input
            type="text"
            name="q"
            placeholder="搜索MCP服务..."
            className="mcp-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="mcp-search-button">搜索</button>
        </form>
      </div>
    </section>
  );
};

export default McpHero;
