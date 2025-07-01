import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ToolsPage from './pages/ToolsPage';
import ProjectsPage from './pages/ProjectsPage';
import McpLandingPage from './pages/McpLandingPage';
import McpSearchResultsPage from './pages/McpSearchResultsPage';
import McpTagPage from './pages/McpTagPage'; // Import the new McpTagPage

// Placeholder for pages not yet created
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/mcp" element={<McpLandingPage />} />
        <Route path="/mcp/search-results" element={<McpSearchResultsPage />} />
        <Route path="/mcp/tag/:tagSlug" element={<McpTagPage />} /> {/* Dynamic route for tags */}
        {/* Add more routes as pages are converted */}
        <Route path="*" element={<PlaceholderPage title="404 Not Found" />} /> {/* Catch-all for unmatched routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
