const express = require("express");
const app = express();
const path = require('path');
const indexRouter = require('./router')

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`${port}포트 포트로 이동중.....`)
})