const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;



connectToMongo();

app.use(cors())
app.use(express.json())

// Routes
app.use('/notes' , require('./routes/notes'))
app.use('/auth' , require('./routes/auth'))

app.listen(port , ()=>{
    console.log(`app is running on ${port}`);
})
