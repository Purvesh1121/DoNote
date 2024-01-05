import "dotenv/config";

const port = process.env.PORT || 8080;

// TODO: setup the required config variables from .env file
const config = {
  port,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "donotedb",
  },
  // TODO: Remove redis string config if not using redis
  REDIS_CONNECTION_STRING:
    process.env.REDIS_CONNECTION_STRING || "redis://localhost:6379",
  api: {
    prefix: "/api",
  },
  NODE_ENV: process.env.NODE_ENV || "development",
  logs: {
    path: process.env.LOG_PATH || "./",
    level: process.env.LOG_LEVEL || "silly",
  },
  saltRounds: 10,
  jwtSecret: process.env.JWT_SECRET || "my-jwt-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
};

export default config;
