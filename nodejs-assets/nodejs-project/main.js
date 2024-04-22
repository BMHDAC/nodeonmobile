const express = require('express');
const http = require('http');
const app = express();
var rn_bridge = require('rn-bridge');
const path = require('path');

class serverProvider {
  servers = new Map();
  createServer(port) {
    const s = http
      .createServer(function (req, res) {
        res.write('Hello Word from port: ' + port);
        res.end();
      })
      .listen(port);
    this.servers.set(port, s);
    rn_bridge.channel.send('Port listening');
  }
  deleteServer(port) {
    if (this.servers.has(port)) {
      this.servers.delete(port);
    } else {
      rn_bridge.channel.send('The port did not exists');
    }
  }
}
const servers = new serverProvider();
rn_bridge.channel.post('command', {name: 'Open', message: 'Connection Open'});
rn_bridge.channel.on('message', msg => {
  rn_bridge.channel.send(msg);
});
rn_bridge.channel.on('command', method => {
  if (method.name == 'Create') {
    try {
      servers.createServer(method.port);
    } catch (error) {
      rn_bridge.channel.send(
        'This port is already taken, please change port and try again',
      );
    }
  } else if (method.name == 'Delete') {
    servers.deleteServer(method.port);
  } else {
    rn_bridge.channel.post('command', method);
  }
});
