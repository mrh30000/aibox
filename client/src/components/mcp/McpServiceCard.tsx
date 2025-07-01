import React from 'react';

// Helper function for formatting numbers (can be moved to a utils file)
const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined || num === null) return '';
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return String(num); // Return original if not a number after parsing

    if (n >= 1000000) {
      return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (n >= 1000) {
      return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return String(n);
};

interface McpServiceCardProps {
  id: string | number; // Added id for key prop in lists
  externalServiceUrl: string;
  imageUrl?: string;
  name: string;
  isVerified?: boolean;
  description: string;
  languageOrTech?: string;
  userCountOrStars?: number | string;
  rating?: number | string;
}

const McpServiceCard: React.FC<McpServiceCardProps> = ({
  externalServiceUrl,
  imageUrl,
  name,
  isVerified,
  description,
  languageOrTech,
  userCountOrStars,
  rating,
}) => {
  return (
    <div className="mcp-service-card">
      <a href={externalServiceUrl} target="_blank" rel="noopener noreferrer" className="mcp-service-card-link">
        <div className="mcp-service-card-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={`${name} logo`} className="mcp-service-card-image" />
          ) : (
            <img src="/images/placeholder-mcp.png" alt={`${name} placeholder`} className="mcp-service-card-image" />
          )}
        </div>
        <div className="mcp-service-card-content">
          <h3 className="mcp-service-card-title">
            {name}
            {isVerified && <span className="mcp-verified-badge">已认证</span>}
          </h3>
          <p className="mcp-service-card-description">{description}</p>
          <div className="mcp-service-card-footer">
            {languageOrTech && <span className="mcp-service-card-tech">{languageOrTech}</span>}
            <div className="mcp-service-card-stats">
              {userCountOrStars !== undefined && (
                <span className="mcp-service-card-users">
                  <i className="fas fa-users"></i> {formatNumber(userCountOrStars)}
                </span>
              )}
              {rating !== undefined && (
                <span className="mcp-service-card-rating">
                  <i className="fas fa-star"></i> {rating}分
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default McpServiceCard;
