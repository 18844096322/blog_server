// src/server/index.js

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('../server/controller');

app.use(bodyParser());

app.use(controller());

app.listen(1129);
console.log('App started at port 1129...')
