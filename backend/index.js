const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

const router = require('./routes/index');
// console.log(port);
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).send('server start');
})

app.listen(port, () => {
    console.log(`server start on port no ${port}`);
})


