var express = require('express');
var router = express.Router();
const { connectToDatabase, sql } = require('../conect/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  try {
    console.log('pegando dados')
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM dados');
    res.json(result.recordset);
} catch (err) {
    res.status(500).send('Erro ao obter usuários');
}
});

router.get('/token', async(req, res, next) =>{
  try {
    const payload = {
      data: 'chave' 
    };
    const token = jwt.sign( payload , 'teste_segredo', { expiresIn: '12h' });
    res.json({sucess: true, message: 'pegue seu token', token})
  } catch (err) {
    res.status(500).send('erro ao gerar token');
  }
});
  
router.get('/auth', authenticateToken, async(req, res, next) =>{
  try {
    console.log('Pegando dados', req.user);
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM dados');
    res.json(result.recordset);
} catch (err) {
    res.status(500).send('Erro ao obter usuários');
}
});

module.exports = router;
