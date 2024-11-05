// testConnection.js
const pool = require('./db');

async function testDatabaseConnection() {
  try {
    // Tentativa de conexão ao banco de dados
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados bem-sucedida!');
    connection.release(); // Libera a conexão
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  } finally {
    pool.end(); // Fecha o pool de conexões após o teste
  }
}

testDatabaseConnection();
