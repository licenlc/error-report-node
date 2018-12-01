const Koa = require('koa')
const onerror = require('koa-onerror')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const logger = require('./util/logger')
const middleware = require('./middlewares')

let routerConfig = require('./router-config')

let app = new Koa()
onerror(app)

app
.use(middleware.ipFilter)
.use(logger)
.use(middleware.util)
.use(cors({ credentials: true, maxAge: 2592000 }))
.use(koaBody({ multipart: true}))
.use(routerConfig.api.routes())
.use(routerConfig.api.allowedMethods)


app.listen(4545, () => {
    console.log('应用启动成功')
})