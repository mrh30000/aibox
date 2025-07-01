import React from 'react';

// Helper function for formatting dates (can be moved to a utils file)
// This is a very basic formatter. For more complex needs, use a library like date-fns.
const formatDate = (date: string | Date | undefined, format: string = 'YYYY-MM-DD'): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return String(date); // Return original if invalid date

    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    // const hours = ('0' + d.getHours()).slice(-2);
    // const minutes = ('0' + d.getMinutes()).slice(-2);
    // const seconds = ('0' + d.getSeconds()).slice(-2);

    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    }
    // Add more formats if needed
    return d.toLocaleDateString(); // Fallback to locale default
};


interface McpTutorialCardProps {
  id: string | number; // Added id for key prop in lists
  externalTutorialUrl: string;
  imageUrl?: string;
  title: string;
  summary: string;
  publishDate?: string | Date;
  viewCount?: number | string;
}

const McpTutorialCard: React.FC<McpTutorialCardProps> = ({
  externalTutorialUrl,
  imageUrl,
  title,
  summary,
  publishDate,
  viewCount,
}) => {
  return (
    <div className="mcp-tutorial-card">
      <a href={externalTutorialUrl} target="_blank" rel="noopener noreferrer" className="mcp-tutorial-card-link">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="mcp-tutorial-card-image" />
        ) : (
          <img src="/images/placeholder-tutorial.png" alt={`${title} placeholder`} className="mcp-tutorial-card-image" />
        )}
        <div className="mcp-tutorial-card-content">
          <h3 className="mcp-tutorial-card-title">{title}</h3>
          <p className="mcp-tutorial-card-summary">{summary}</p>
          <div className="mcp-tutorial-card-footer">
            {publishDate && (
              <span className="mcp-tutorial-card-date">{formatDate(publishDate)}</span>
            )}
            {viewCount !== undefined && (
              <span className="mcp-tutorial-card-views">
                <i className="fas fa-eye"></i> {viewCount}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default McpTutorialCard;
