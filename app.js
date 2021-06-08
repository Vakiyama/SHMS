// dependencies
const express = require('express') 
const mongoose = require('mongoose')
const keys = require('./config/keys')
const path = require('path')

// setting up mongoDB
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      keys.mongodb.dbURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

// setting up express app
const app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// routes
const shopping = require('./routes/shopping-routes')
const tasks = require('./routes/tasks-routes')


app.use('/shopping', shopping)
app.use('/house-tasks', tasks)


app.listen(3000, () => {
    console.log('listening on port 3000')
})
