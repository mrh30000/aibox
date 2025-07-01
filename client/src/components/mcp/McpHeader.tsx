import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for client-side navigation

const McpHeader: React.FC = () => {
  return (
    <header className="mcp-main-header">
      <div className="mcp-logo-container">
        <Link to="/mcp" className="mcp-logo-link">
          {/* Assuming images are in public/images. If not, adjust path or import. */}
          <img src="/images/aibase-logo.svg" alt="AIbase MCP Logo" className="mcp-logo-img" />
          <span className="mcp-logo-text">AIbase MCP</span>
        </Link>
      </div>
      <nav className="mcp-main-nav">
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/tools">AI产品库</Link></li>
          {/* <li><Link to="/models">模型广场</Link></li> */} {/* Assuming this page doesn't exist yet */}
          <li><Link to="/mcp">MCP服务库</Link></li>
          <li><Link to="/news">AI资讯</Link></li>
        </ul>
      </nav>
      {/* Placeholder for search or user profile if needed in header */}
    </header>
  );
};

export default McpHeader;
