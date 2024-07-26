const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock/database.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3333, () => {
  console.log('JSON Server está sendo executado');
});
