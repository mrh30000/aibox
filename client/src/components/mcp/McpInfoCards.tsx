import React from 'react';
import { Link } from 'react-router-dom'; // For internal links

interface InfoCardData {
  title: string;
  description: string;
  linkUrl?: string; // URL for the card link
  isComingSoon?: boolean;
  isExternalLink?: boolean; // To differentiate between internal and external links
}

interface McpInfoCardsProps {
  cardsData: InfoCardData[];
}

const McpInfoCards: React.FC<McpInfoCardsProps> = ({ cardsData }) => {
  if (!cardsData || cardsData.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <section className="mcp-info-cards-section">
      {cardsData.map((card, index) => (
        <div className="mcp-info-card" key={index}>
          {card.isComingSoon ? (
            <div className="mcp-info-card-content coming-soon">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span>即将上线，敬请期待</span>
            </div>
          ) : card.linkUrl ? (
            card.isExternalLink ? (
                <a href={card.linkUrl} className="mcp-info-card-link" target="_blank" rel="noopener noreferrer">
                    <div className="mcp-info-card-content">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                </a>
            ) : (
                <Link to={card.linkUrl} className="mcp-info-card-link">
                    <div className="mcp-info-card-content">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                </Link>
            )
          ) : (
            // Fallback if not coming soon and no linkUrl (though ideally one should exist)
            <div className="mcp-info-card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default McpInfoCards;
