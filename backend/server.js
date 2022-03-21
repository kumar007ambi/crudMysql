const express = require('express')
require("dotenv").config()
const mysql=require('mysql')
const app = express()
const bodyParser=require("body-parser");
const path=require('path')


var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


const indexRuter=require("./routes/crudRoute");

app.use('/',cors(),indexRuter);

const port = process.env.PORT;
app.listen(process.env.port, () => {
  console.log(`Example app listening at ${port}`)
})
