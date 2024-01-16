/**/ 'use strict' /**/
var Resolver = require('y-resolver'),
    Yielded = Resolver.Yielded,

    resolver = Symbol(),
    args = Symbol();

class Detacher extends Yielded{

  constructor(){
    super(resolver);
    this[args] = arguments;
  }

  get active(){
    return !this.done;
  }

  detach(){
    var a;

    if(this.done) return;

    a = this[args];
    delete this[args];

    if(a.length) try{ a[0].apply(a[2] || this,a[1] || []); }
    catch(e){ setTimeout(throwError,0,e); }

    this[resolver].accept();
  }

}

// - utils

function throwError(e){
  throw e;
}

/*/ exports /*/

module.exports = Detacher;
