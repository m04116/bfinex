const { createServer } = require('http');
const app = require('./app');

const server = createServer(app);

server.listen('3000', () => {
    console.log('server is running on port 3000');
});