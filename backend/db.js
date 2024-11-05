// db.js
const mysql = require('mysql2/promise');

// Configuração da conexão
const pool = mysql.createPool({
  host: '31.220.17.47',       // Seu host, geralmente localhost
  user: 'fran_admin',     // Seu usuário do banco de dados
  password: 'Fpadmin#24',   // Sua senha do banco de dados
  database: 'fran_fpbddata',   // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
