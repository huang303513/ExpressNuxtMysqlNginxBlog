import { Nuxt, Builder } from 'nuxt'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { startRouter } from './api/index'
let nuxtConfig = require('../nuxt.config.js');
import getConfig from '../config';
let config = getConfig(process.env.NODE_ENV);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || config.port;
// app.set('port', port);
// Import Routes
startRouter(app);
process.on('uncaughtException', (err) => {
	fs.writeSync(1, `Caught exception: ${err}\n`);
});
//promise错误未处理
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
let nuxt = new Nuxt(nuxtConfig);
if (true) {
	const builder = new Builder(nuxt);
	builder.build();
}
// Add nuxt.js middleware
app.use(nuxt.render);
// Listen the server
app.listen(port, host, function () {
	console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
});


