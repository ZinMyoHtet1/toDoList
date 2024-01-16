var Resolver = require('y-resolver'),
    worker,
    counter = 0,
    resolvers = {},
    values = {};

worker = new Worker(URL.createObjectURL(new Blob([
  'function echo(data){' +
    'postMessage(data);' +
  '}' +

  'addEventListener("message",function(e){' +
		'setTimeout(echo,Math.max(e.data[0]-2,0),e.data[1]);' +
	'});'
],{type: 'text/javascript'})));

worker.onmessage = function(e){
  var r = resolvers[e.data],
      v = values[e.data];

  delete resolvers[e.data];
  delete values[e.data];
  r.accept(v);
};

module.exports = function(t,v){
  var resolver = new Resolver(),
      id = counter = (counter + 1)%1e15;

  resolvers[id] = resolver;
  values[id] = v;
  worker.postMessage([t,id]);

  return resolver.yielded;
};
