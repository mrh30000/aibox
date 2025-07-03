import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

// Note: The <title> and <meta> tags, along with global stylesheets (<link>),
// are typically managed in the main HTML file (e.g., public/index.html)
// when using Create React App or similar setups where React mounts into a div.
// For this conversion, we'll assume these will be in the main HTML.
// The Layout component will focus on the repeating structure within the <body>.

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Header, Nav, Main, Footer structure */}
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
              <a href="/" className="nav-logo">
                <img src="https://ext.same-assets.com/155488376/1420179480.png" alt="AIbase" className="logo-img" />
              </a>
              <div className="nav-menu">
                <div className="nav-item dropdown">
                  <a href="/news" className="nav-link">AI资讯 <span className="dropdown-arrow">▼</span></a>
                </div>
                <div className="nav-item dropdown">
                  <a href="/tools" className="nav-link">AI产品库 <span className="dropdown-arrow">▼</span></a>
                </div>
                <div className="nav-item dropdown">
                  <a href="/projects" className="nav-link">AI项目库 <span className="dropdown-arrow">▼</span></a>
                </div>
                <div className="nav-item">
                  <a href="/mcp" className="nav-link">MCP服务库</a>
                </div>
              </div>
              <div className="nav-actions">
                <div className="search-box">
                  <input type="text" placeholder="搜索..." className="search-input" />
                  <button className="search-btn">🔍</button>
                </div>
                <div className="language-switch">
                  <span className="language-current">🌐 ZH ▼</span>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="main">
          {children}
        </main>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>AIbase服务</h3>
              <p>我们致力于AI资讯传递的AI产品体验，我们致力于AI配置的AI可视应用深度体验，我们还AI产品成就感的AI应用深度体验，我们收益爱AI的综合化之乎。</p>
              <div className="footer-icons">
                <div className="footer-icon">
                  <span>📦</span>
                  <span>产品库</span>
                </div>
                <div className="footer-icon">
                  <span>🧠</span>
                  <span>AI头条</span>
                </div>
                <div className="footer-icon">
                  <span>🔧</span>
                  <span>AI导航</span>
                </div>
                <div className="footer-icon">
                  <span>🔗</span>
                  <span>AI产品</span>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h3>AIbase媒体矩阵</h3>
              <div className="media-grid">
                <div className="media-item">
                  <span>AIbase基地</span>
                  <p>传递AI研究资讯</p>
                </div>
                <div className="media-item">
                  <span>AIbase交流群</span>
                  <p>交友和AI爱好者们</p>
                </div>
                <div className="media-item">
                  <span>AI变现指南</span>
                  <p>获取最新AI变现案例</p>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h3>AIbase服务</h3>
              <div className="stats">
                <div className="stat-number">20150+</div>
                <div className="stat-label">累计时间：2025-06-04</div>
                <button className="footer-btn">申请合作</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 AIbase. All rights reserved. - ICP备08105208号-14备案数据 - 隐私政策</p>
          </div>
        </footer>
        {/* public/js/script.js is currently not included as direct script tags are not standard in React components like this.
            If its functionality is needed, it should be imported or its logic integrated into React components.
            For now, I'm omitting it. We can address its functionality later if needed.
        */}
        {/* <script src="/js/script.js"></script> */}
      {/* The main HTML file (e.g., public/index.html) will contain the necessary script tags if script.js is global.
          Alternatively, its functionality might be integrated into specific React components or hooks.
       */}
    </>
  );
};

export default Layout;
