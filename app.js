const http = require('http');
const port = 8080;

const requestHandler = (request, response) => {
  response.end('Hello World!');
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
