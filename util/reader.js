const fs = require('fs');

const read = (path, processor) => new Promise((resolve, reject) => {
  fs.stat(path, (errorStat) => {
    if (errorStat) {
      reject(new Error(`Could find (stat) file @ ${path} :: ${errorStat}`));
    }

    fs.readFile(path, 'utf8', (errorRead, data) => {
      if (errorRead) {
        reject(new Error(`Could not read file @ ${path} :: ${errorRead}`));
      }

      resolve(processor(data));
    });
  });
});

module.exports = { read };
