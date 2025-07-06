// Basic database configuration
// In a real app, this would come from environment variables or a more robust config system.
export const databaseConfig = {
  uri: process.env.NEWS_MONGO_URI || 'mongodb://localhost:27017/news_microservice_db',
};
