// services/resumeService.js
const pool = require('../db');

// Função para buscar informações pessoais
async function getPersonalInfo() {
    const [rows] = await pool.query('SELECT * FROM Profile LIMIT 1');
    return rows[0];
}

// Função para buscar experiência
async function getExperience() {
    const [rows] = await pool.query('SELECT * FROM WorkExperience ORDER BY start_date DESC');
    return rows;
}

// Função para buscar habilidades
async function getSkills() {
    const [rows] = await pool.query('SELECT * FROM Skills');
    return rows;
}

async function getEducation(){
    const [rows] = await pool.query('SELECT * FROM Education');
    return rows;
}

async function getCertification(){
    const [rows] = await pool.query('SELECT * FROM Certifications');
    return rows;
}

async function getLanguages(){
    const [rows] = await pool.query('SELECT * FROM Languages');
    return rows;
}

module.exports = {
  getPersonalInfo,
  getExperience,
  getSkills,
  getEducation,
  getCertification,
  getLanguages
};
