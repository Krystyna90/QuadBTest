const {pool} = require ('../server');

const tickerData = async (req, res) => {
   try {
    const result = await pool.query('SELECT * FROM hodlinfo');
    const data = result.rows;
    res.json(data);
   } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    throw error;
   }
}

module.exports = tickerData