export const databaseConfig = {
  // Use environment variable for URI, fallback to localhost for non-Docker local dev
  uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/aibox',
  options: {
    // useNewUrlParser and useUnifiedTopology are deprecated in newer Mongoose versions
    // Mongoose 6+ handles these by default.
    // If using Mongoose < 6, keep them. Otherwise, they can be removed.
    // Assuming Mongoose 6+ for now.
  },
};
