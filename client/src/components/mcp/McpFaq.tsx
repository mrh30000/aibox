import React, { useState } from 'react';

interface FaqItemData {
  question: string;
  answer: string; // Can contain HTML
}

interface McpFaqProps {
  faqData: FaqItemData[];
}

const FaqItem: React.FC<{ item: FaqItemData }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mcp-faq-item">
      <h3 className={`mcp-faq-question ${isOpen ? 'active' : ''}`} onClick={toggleOpen}>
        {item.question}
      </h3>
      {isOpen && (
        <div className="mcp-faq-answer">
          {/* Use dangerouslySetInnerHTML because the HBS template used triple-stash, implying HTML content */}
          <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
        </div>
      )}
    </div>
  );
};

const McpFaq: React.FC<McpFaqProps> = ({ faqData }) => {
  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <section className="mcp-section mcp-faq-section">
      <h2 className="mcp-section-title">常见MCP问题解答</h2>
      <div className="mcp-faq-list">
        {faqData.map((item, index) => (
          <FaqItem item={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default McpFaq;
