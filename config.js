const PORT = process.env.PORT || 3001;

const DB_HOST = process.env.DB_HOST || "localhost";

const DB_USER = process.env.DB_USER || "postgres";

const DB_PASSWORD = process.env.DB_PASSWORD || "4844998casa";

module.exports = { PORT, DB_HOST, DB_PASSWORD, DB_USER};
