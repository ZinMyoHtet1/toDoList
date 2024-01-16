
if(global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame)
  module.exports = require('./normal.js');
else
  module.exports = require('./hacky.js');
