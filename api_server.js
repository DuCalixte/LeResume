const jsonServer = require('json-server');
const database = process.env.DATABASE || 'spa/data/db.json';
const api_port = process.env.API_PORT || 3004;
const server = jsonServer.create();
const router = jsonServer.router(database);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(api_port, () => {
  console.log(`JSON Server is running on port ${api_port}...`);
});
