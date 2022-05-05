'use strict';

const fs = require('fs/promises');

module.exports = async function registerEvents(client, deps) {
  const eventFiles = await fs.readdir(__dirname);
  eventFiles
    .filter(file => !file.endsWith('index.js'))
    .map(file => require(`./${file}`)) // eslint-disable-line
    .forEach(event => {
      function handler(...args) {
        return event.execute(...args, client, deps);
      }
      if (event.once) client.once(event.name, handler);
      else client.on(event.name, handler);
    });
};
