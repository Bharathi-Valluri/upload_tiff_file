const fs = require('fs')
const router = require('./router/router')
const express = require('express')
const app = express()
const PORT = 5080
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
function run () {
  try {
    console.log('connected to the database')
    app.use('/', router)
    app.listen(PORT, () => {
      console.log(`serveris running on port no:${PORT}`)
    })
  } catch (error) {
    console.log('server is not running at port 8000' + error)
  }
}
run()
