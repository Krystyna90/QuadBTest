const pool = require('./model/poolModel.js')
const {server} = require ('./app')
const fetchDataFromAPI = require ('./dataFetcher/fetchDataFromAPI.js')

require('dotenv').config()

const {PORT} = process.env

pool.connect()
.then(() => {
    server.listen(PORT, () => {
        console.log('Server is on the 5501 port')
      });
    fetchDataFromAPI(pool)
})
.catch((error) => {
    console.log(error.message)
    process.exit(1)
})
