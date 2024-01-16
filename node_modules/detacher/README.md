# Detacher [![Build Status][ci-img]][ci-url] [![Coverage Status][cover-img]][cover-url]

## Sample usage

```javascript
var Detacher = require('detacher'),

    d1 = new Detacher(),
    d2 = new Detacher(),
    d3 = new Detacher(),

    c = new Detacher();

console.log(d1.active); // true
d1.detach();
console.log(d1.active); // false

console.log(d2.active); // true
console.log(d3.active); // true

c.add(d2);
c.add(d3);
c.detach();

console.log(d2.active); // false
console.log(d3.active); // false
```

[ci-img]: https://circleci.com/gh/manvalls/detacher.svg?style=shield
[ci-url]: https://circleci.com/gh/manvalls/detacher
[cover-img]: https://coveralls.io/repos/manvalls/detacher/badge.svg?branch=master&service=github
[cover-url]: https://coveralls.io/github/manvalls/detacher?branch=master
