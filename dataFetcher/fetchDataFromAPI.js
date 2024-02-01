require('dotenv').config()

const { DB_DATABASE_NAME, API_LINK } = process.env

async function fetchDataFromAPI(pool) {
    try {
        const response = await fetch(`${API_LINK}`)
        const data = await response.json();
        const top10Tickers = Object.values(data)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10);

        await Promise.all(top10Tickers.map(async (ticker) => {
          const { name, last, buy, sell, volume, base_unit } = ticker;
          const query = {
            text: `INSERT INTO ${DB_DATABASE_NAME} (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [name, last, buy, sell, volume, base_unit],
             };
          await pool.query(`DELETE FROM ${DB_DATABASE_NAME}`);
          await pool.query(query);
         }));
    } catch (error) {
        throw error;
    } finally {
        await pool.end();
    }
}

module.exports = fetchDataFromAPI