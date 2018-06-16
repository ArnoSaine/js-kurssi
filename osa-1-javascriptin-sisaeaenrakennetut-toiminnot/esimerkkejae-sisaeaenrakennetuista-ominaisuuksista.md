# Esimerkkejä sisäänrakennetuista ominaisuuksista

### Prototyyppifunktioita

| **Funktio** | **Selitys** | **Esimerkki** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `String.prototype.indexOf` | Palauttaa indeksin, josta merkkijono löytyy, tai -1 | `'moo'.indexOf('oo'); // 1` |
| `String.prototype.includes` | Palauttaa `true`tai `false` riippuen, löytyykö etsitty teksti | `'moo'.includes('f'); // false` |
| `String.prototype.split` | Palauttaa taulukon, jonka arvoina on merkkijono katkaistuna valitun erotintekstin kohdista | `'moo'.split(''); // ['m', 'o', 'o']` |
| `Array.prototype.indexOf` | Palauttaa indeksin, josta etsittävä arvo löytyy `===`vertailua käyttäen, tai -1 | `['m', 0, 'o'].indexOf(0); // 1` |
| `Array.prototype.includes` | Palauttaa `true`tai `false` riippuen, löytyykö etsitty arvo | `['m', 0, 'o'].includes(0); // true` |
| `Array.prototype.find` | Palauttaa elementin arvon tai `undefined` riippuen, palauttaako parametrina annettava testifunktio _truthy_-arvon | `['m', 0, 'o'].find(item => item === 'm'); // 'm'` |
| `Array.prototype.filter` | `.find`-kaltainen, mutta palauttaa uuden taulukon, joka sisältää alkuperäisen taulukon elementit, joiden kohdalla parametrina annettava testifunktio palauttaa _truthy_-arvon | `['m', 0, 'o'].filter(item => item === 'm'); // ['m']` |
| `Array.prototype.map` | Palauttaa uuden taulukon, jossa jokaisella alkuperäisen taulukon elementillä kutsutaan funktiota ja funktiokutsujen tulokset asetetaan uuden taulukon arvoiksi | `[1, 2, 3].map(x => 2 * x); // [2, 4, 6]` |
| `Array.prototype.join` | Liittää taulukon tekstiksi käyttäen mahdollista erotinmerkkijonoa | `[1, 2, 3].join('-'); // '1-2-3'` |

### Staattisia funktioita

| **Funktio** | **Selitys** | **Esimerkki** |
| --- | --- | --- | --- | --- |
| `Object.keys` | Palauttaa objektin omien propertyjen nimet taulukkona | `Object.keys({ a: 1, b: 2 }); // ['a', 'b']` |
| `Object.values` | Palauttaa objektin omien propertyjen arvot taulukkona | `Object.values({ a: 1, b: 2 }); // [1, 2]` |
| `Object.entries` | Palauttaa objektin omat propertyt key–value -pareina | `Object.entries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]` |
| `Array.isArray` | Palauttaa `true` tai `false` riippuen, onko annettu parametri taulukko-objekti | `Array.isArray([1, 2, 3]); // true` |

{% hint style="info" %}
Usein `Object.keys`, `values` ja `entries` ovat hyödyllisiä yhdistettynä `Array`-funktioihin, kuten `map` ja `filter`.
{% endhint %}

[Täydellinen lista globaaleista objekteista MDN:ssä](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects)

