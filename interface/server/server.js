var koa = require('koa');
var config = require('config');
var serve = require('koa-static');
var router = require('koa-router')();
var mysqldb = require('./databases/mysql');
var path = require('path');
var app = module.exports = koa();

mysqldb.init();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve(path.join(__dirname, '../www/public/')));

if (!module.parent) {
    var port = 8000;
    try {
        port = config.server.port;
    } catch(Exception) {
        console.log('[w] No listening port set, using default: ' + 
                    port.toString());
    }
    console.log('[i] Listening on port: ' + port.toString());
    app.listen(port);
}
var sample = require('./controllers/sample');
router.get('/sample', sample.fetch);
