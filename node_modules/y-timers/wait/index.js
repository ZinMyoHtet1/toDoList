
if(global.document && global.Worker && global.Blob) module.exports = require('./hacky.js');
else module.exports = require('./normal.js');
