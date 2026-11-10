require('dotenv').config()

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'palavra123',
  database: process.env.DB_DATABASE || 'dev-burguer-db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}