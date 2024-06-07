var express = require('express');
var router = express.Router();
const { connectToDatabase, sql } = require('../conect/db');

router.post('/data', async (req, res) => {
    const { sensor, valores } = req.body;
    const { temperatura, umidade, luminosidade } = valores;
    const data = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formata a data para o formato MySQL
  
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('temperatura', sql.Float, temperatura)
            .input('umidade', sql.Float, umidade)
            .input('luminosidade', sql.Float, luminosidade)
            .input('data', sql.DateTime, data)
            .query('INSERT INTO dados (temperatura, umidade, luminosidade, data) VALUES (@temperatura, @umidade, @luminosidade, @data)');
        
        console.log('Dados inseridos no banco de dados:', result);
        res.send('Dados recebidos e inseridos no banco de dados.');
    } catch (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        res.status(500).send('Erro ao inserir dados no banco de dados.');
    }
});

module.exports = router;