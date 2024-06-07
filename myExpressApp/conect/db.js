// db.js
const sql = require('mssql');


const config = {
    user: 'banco',
    password: 'Planta123',
    server: 'eua.database.windows.net', 
    database: 'Plantinha',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

let pool;

async function connectToDatabase() {
    if (pool) return pool;
    try {
        pool = await sql.connect(config);
        console.log('Conectado ao Banco de Dados!');
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao Banco de Dados SQL do Azure:', err);
        throw err;
    }
}

module.exports = {
    sql,
    connectToDatabase
};