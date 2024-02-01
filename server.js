const {server} = require ('./app')
const {Pool} = require('pg')

require('dotenv').config()

const { DB_PASSWORD, DB_PORT, PORT = 4001 } = process.env

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'krystynadb',
    password: DB_PASSWORD,
    port: DB_PORT
  })

pool.connect()
.then(() => {
    server.listen(PORT, () => {
        console.log('Server is on the 4001 port')
      });
})
.catch((error) => {
    console.log(error.message)
    process.exit(1)
})