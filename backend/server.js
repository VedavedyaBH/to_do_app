const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const api = require("./api")

const port = 8086;

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json())

app.use(api);

const server = app.listen(port, async()=>{
    console.log(`Server is running on port`, {port})
})

module.exports = server