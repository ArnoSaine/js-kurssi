# Periaate

* JavaScript-kieli suunniteltiin sellaiseksi, että kun uusiin selaimiin kehitetään toimintoja, vanhojen selaimien ominaisuuksia voidaan jälkikäteen paikata \(“polyfillata”\)

### **Esimerkki**

`String.prototype.includes`-metodin polyfill [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/includes):ssä:

```javascript
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
```

