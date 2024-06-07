var express = require('express');
var router = express.Router();
const { connectToDatabase, sql } = require('../conect/db');

router.get('/', async (req, res, next) => {
    try {
      console.log('Pegando os últimos 5 dados');
      const pool = await connectToDatabase();
      const result = await pool.request().query('SELECT TOP 5 * FROM dados ORDER BY data DESC');
      res.json(result.recordset);
    } catch (err) {
      console.error('Erro ao obter os últimos 5 dados:', err);
      res.status(500).send('Erro ao obter dados');
    }
  });
  
  module.exports = router;