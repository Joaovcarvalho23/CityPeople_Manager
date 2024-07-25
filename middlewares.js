const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock/database.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

server.use(router);

server.listen(3333, () => {
  console.log('JSON Server is running on port 3333');
});
