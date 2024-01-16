var tick;

module.exports = function(){
  return tick.apply(this,arguments);
};

if(global.setImmediate) tick = require('./normal.js');
else if(global.Promise) tick = require('./hacky/promise.js');
else if(global.Image) tick = require('./hacky/image.js');
else tick = require('./hacky/zero-wait.js');
