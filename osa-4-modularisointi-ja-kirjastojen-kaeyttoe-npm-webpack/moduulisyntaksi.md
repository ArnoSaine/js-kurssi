# Moduulisyntaksi

{% code-tabs %}
{% code-tabs-item title="a.js" %}
```javascript
// Default export
export default function moo() {
  return 'moo';
}

// Named export
export const dii = 123;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="b.js" %}
```javascript
import moo, { dii } from './a';

console.log(moo(), dii); // => "moo", 123
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Polut

* `.`-alkuisena polku on suhteellinen tiedostoon, jossa `import` tehdään
* Muissa tapauksissa pakettia haetaan ylemmistä `node_modules`-kansioista \(lähimmästä ensin\) kunnes paketti löytyy tai ollaan käyttöjärjestelmän juurihakemistossa
  * `package.json`-tiedoston mukaan määräytyy, mikä tiedosto paketista jaetaan \(oletuksena `index.js`\)
  * Paketista voidaan voidaan hakea tiedosto myös polun mukaan

    ```javascript
    import moo from 'some-lib/dist/js/moo';
    ```

{% hint style="info" %}
* Node.js -sovelluksissa tulee toistaiseksi käyttää CommonJS-moduulisyntaksia, mikäli tiedostoja ei käännetä
  * Esimerkiksi `webpack.config.js`-tiedosto on tällainen

```javascript
// Import
const jotain = require('jotain');

module.export = {
  // Default export
  default: function moo() {},
  // Named export
  dii: 123
}
```
{% endhint %}



