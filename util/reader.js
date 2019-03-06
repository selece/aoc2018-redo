const fs = require('fs');

const read = (path, processor) => {
  fs.stat(path, (errorStat) => {
    if (errorStat) {
      throw new Error(`Could find (stat) file @ ${path} :: ${errorStat}`);
    }

    fs.readFile(path, 'utf8', (errorRead, data) => {
      if (errorRead) {
        throw new Error(`Could not read file @ ${path} :: ${errorRead}`);
      }

      return processor(data);
    });
  });
};

module.exports = { read };
