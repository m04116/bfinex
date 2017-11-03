const { createServer } = require('http');
const app = require('./app');

const server = createServer(app);

server.listen('8027', () => {
    console.log('server is running on port 8027');
});