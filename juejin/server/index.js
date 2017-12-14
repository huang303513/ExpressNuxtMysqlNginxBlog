import { Nuxt, Builder } from 'nuxt'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { startRouter } from './api/index'
import { default as config } from '../nuxt.config.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;
app.set('port', port);
// Import Routes
startRouter(app);
process.on('uncaughtException', (err) => {
	fs.writeSync(1, `Caught exception: ${err}\n`);
});
//promise错误未处理
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production');
// Instanciate nuxt.js
let nuxt = new Nuxt(config);
if (config.dev) {
	const builder = new Builder(nuxt);
	builder.build();
}
// Add nuxt.js middleware
app.use(nuxt.render);
// Listen the server
app.listen(port, host, function () {
	console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
});


