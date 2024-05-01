const express = require('express');
const http = require('http');
const app = express();
var rn_bridge = require('rn-bridge');
const path = require('path');

class serverProvider {
  servers = new Map();
  createServer(port) {
    if (port <= 0 || port > 8080 || isNaN(port)) {
      rn_bridge.channel.send({
        message: 'Invalid Port',
        port: 0,
      });
      return;
    }
    if (this.servers.has(port)) {
      rn_bridge.channel.send({
        message: 'Port taken',
        port: 0,
      });
      return;
    }
    const s = http
      .createServer(function (req, res) {
        res.write('Hello Word from port: ' + port);
        res.end();
      })
      .listen(port);
    this.servers.set(port, s);
    rn_bridge.channel.send({
      message: 'Port listening',
      port: port,
    });
  }
  deleteServer(port) {
    if (this.servers.has(port)) {
      this.servers.get(port).close();
      this.servers.delete(port);
      rn_bridge.channel.send({
        message: 'Port deleted',
        port: port,
      });
    } else {
      rn_bridge.channel.send({
        message: 'The port did not exists',
        port: port,
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
    rn_bridge.channel.post('command', method);
  }
});
