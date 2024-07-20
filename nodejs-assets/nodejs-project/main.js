const http = require('http');
const fs = require('fs/promises');
const path = require('path');
var rn_bridge = require('rn-bridge');

class serverProvider {
  servers = new Map();

  createServer(port) {
    if (port <= 0 || port > 8080 || isNaN(port)) {
      rn_bridge.channel.post('command', {
        name: 'Error',
        message: 'Invalid port',
      });
      return;
    }
    if (this.servers.has(port)) {
      rn_bridge.channel.post('command', {
        name: 'Error',
        message: `Port ${port} taken`,
      });
      return;
    }
    const s = http
      .createServer((req, res) => {
        fs.readFile(__dirname + '/dist' + req?.url)
          .then(content => {
            res.setHeader('Content-Type', parseContentType(req.url));
            res.writeHead(200);
            res.end(content);
          })
          .catch(err => {
            fs.readFile(__dirname + '/client_web/404.html').then(content => {
              res.setHeader('Content-Type', 'text/html');
              res.writeHead(500);
              res.end(content);
            });
          });
      })
      .listen(port);

    this.servers.set(port, s);
    rn_bridge.channel.post('command', {
      name: 'Success',
      message: `Port ${port} listening`,
    });
  }

  deleteServer(port) {
    if (this.servers.has(port)) {
      this.servers.get(port).close();
      this.servers.delete(port);
      rn_bridge.channel.post('command', {
        name: 'Success',
        message: `Port ${port} deleted`,
      });
    } else {
      rn_bridge.channel.post('command', {
        name: 'Error',
        message: `The port ${port} does not exists`,
      });
    }
  }
}

const servers = new serverProvider();
rn_bridge.channel.post('command', {name: 'Open', message: 'Connection Open'});
rn_bridge.channel.on('message', msg => {
  rn_bridge.channel.send({
    message: msg || 'Default Message',
    port: 0000,
  });
});

rn_bridge.channel.on('command', method => {
  if (method.name == 'Create') {
    servers.createServer(method.port);
  } else if (method.name == 'Delete') {
    servers.deleteServer(method.port);
  } else {
    rn_bridge.channel.post('command', {
      name: method.name || 'No name',
      message: method.message || 'Please send a valid command',
      port: method.port || 0,
    });
  }
});

function parseContentType(url) {
  let contentType = '';
  switch (path.extname(url)) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    default:
      contentType = 'text/html';
      break;
  }
  return contentType;
}
