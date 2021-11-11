export const config = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "shortener_url",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  },
};
