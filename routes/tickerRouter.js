const express = require('express')
const tickerData = require('../controllers/tickerData')
const router = express.Router()

router.get('/', tickerData)

module.exports = router