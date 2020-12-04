/**
 * Library imports
 */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

/**
 * Routes imports
 */
import machineRoutes from './routes/machine.route';
import priceRoutes from './routes/price.route';
import priceConfigRoutes from './routes/price-config.route';

/**
 * Create new application instance
 */
const app = new Koa();
const PORT = process.env.PORT || 1337;

const server = app
	.use(bodyParser())
	.use(machineRoutes.routes())
	.use(priceRoutes.routes())
	.use(priceConfigRoutes.routes());

if (process.env.NODE_ENV !== 'test') {
	server.listen(PORT);
}

module.exports = server;
