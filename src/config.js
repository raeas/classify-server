module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/classify',
  TEST_DATBASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/classify-test',
  API_TOKEN: process.env.API_TOKEN || 'development',
  CLIENT_ORIGIN: 'http://localhost:3000' 
}