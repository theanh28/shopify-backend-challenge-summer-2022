// required environment variables
['NODE_ENV', 'PORT', 'MONGO_URL'].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  stage: process.env.NODE_ENV,
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
};

module.exports = config;
