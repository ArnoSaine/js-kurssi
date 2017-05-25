# Osa 1 – Sisältö

* JavaScriptin teoriaa
  * Historiaa
  * Tyypit
  * Vertailuista ja loogisten operaattorien käytöstä
  * Objektit ja prototyyppiketju
  * Muuttujien näkyvyysalueet
  * Funktiot ja this-arvo
  * Sisäänrakennetut ominaisuudet
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Miksi JavaScript

* Supernopea (Chrome, Edge, Firefox, Safari, Node.js)
* Java Appletit ja Flash ovat historiaa eikä kilpailijoita ole näköpiirissä
* Selaimet ovat sitoutuneita JavaScriptiin
* Paljon käytetty, ei ole häviämässä mihinkään
* Hyvä ja kehittyvä standardi
* Hyvä yhteisö, paljon käyttökelpoisia kirjastoja
  * Suosituin paketti on usein turvallisin valinta – parhaat dokumentaatiot ja esimerkit

# JavaScriptin historiaa

### 1995
* Julkaistu (Netscape Navigator)
* Self- ja Scheme-kielien kaltainen
* Suunniteltu alunperinkin laajennettavaksi. Ominaisuuksia voi täydentää ja ylikirjoittaa. Ymmärrettiin, että selaimet toteuttavat asioita eri tavalla ja eri tahtia

### ...
* IE ja muut kehittyivät eri tahtia ja osittain eri suuntiin (esimerkiksi ActiveX ja XMLHttpRequest)
* Standardista oli erimielisyyksiä eikä se kehittynyt
* Tuli tilaa apukirjastoille, joista erityisesti jQuery sai suurta suosiota

### 2009
* **ES5:** Pitkästä aikaa uusia tarpeellisia standardoituja ominaisuuksia
  * Selaintuki oli puutteellista vielä pitkään eteenpäin, kunnes IE9 julkaistiin 2011
  * Nykyään vanhempia selaimia ei käytännössä tarvitse tukea – ES5-ominaisuuksia voi käyttää kaikkialla

### 2015
* **ES2015:** Uusia hyödyllisiä ominaisuuksia syntaksiin ja globaaleihin. Koodi on käännettävissä yhteensopivaksi vanhoihin selaimiin [Babelilla](https://babeljs.io/).
* Suunnitelma, miten kieleen tuodaan uusia ominaisuuksia. Selainvalmistajat ovat sitoutuneita

### 2016
* **ES2016:** Uusia ominaisuuksia

### 2017
* **ES2017:** Uusia ominaisuuksia
* Babel-kääntäjään ympäristökohtainen käännösominaisuus ([Env preset](https://babeljs.io/docs/plugins/preset-env/)) - Käännetään vain toiminnot jota kohdeympäristö ei tue natiivisti - Selkeä polku, jolla uusia ominaisuuksia voidaan tuoda ja hyödyntää natiivisti niissä ympäristöissä jotka toimintoja tukevat

# JavaScriptin perusteita
## Tyypit

* JavaScriptissä on muutamia perustyyppejä:
* Tyyppi selviää `typeof`-operaattorilla
  * `typeof`-operaattori palauttaa `string`-arvon
```js
const num = 123;
console.log(typeof num); // => 'number'
```
| `typeof x`    | Esimerkki                                   |
| ------------- | ------------------------------------------- |
| `'undefined'` | `undefined`, `let moo`                      |
| `'object'`    | `{}`, `[]`, `new Date()`, `/^abc$/`, `null` |
| `'boolean'`   | `true`                                      |
| `'number'`    | `123`                                       |
| `'string'`    | `'moo'`                                     |
| `'symbol'`    | `Symbol('foo')`                             |
| `'function'`  | `function f() {}`                           |

## Viittaukset ja kopiot

### Objektit (sekä taulukot) ja funktiot välitetään viittauksina
```js
// Funktio joka asettaa parametrina saadulle arvolle propertyn `moo`
// arvolla 'MOO'.
function setMoo(obj) {
  obj.moo = 'MOO';
}
const o = {}; // Luodaan (tyhjä) objekti.
setMoo(o);
console.log(o.moo); // => 'MOO'
```

* Muut tyypit välitetään kopiona
* Arvo on muuttumaton ja voidaan korvata vain sijoittamalla muuttujaan uusi arvo:
```js
let a = 123;
let b = a; // Kopioidaan arvo.
a = 456; // Ylikirjoitetaan vanha arvo. b:n arvo pysyy ennallaan.
console.log(b); // => 123
```

## Yhtäsuuruusvertailut

* JavaScriptissä käytetään `===` ja `!==` -vertailuita
  * Eri tyypin (`typeof`) arvot (esimerkiksi `function` ja `string`) ovat aina erisuuret
  * Objektin tai funktion on viitattava samaan arvoon, jotta vertailun tulos on tosi
  * Muiden tietotyyppien kanssa arvon on oltava sama *
* On olemassa myös `==` ja `!=` -vertailuoperaattorit
  * Ne tekevät tyyppimuunnoksia jotka aiheuttavat helposti virheitä. Esimerkiksi:
    * `[] == undefined` → `true`
    * `[0] == undefined` → `false`
    * `[1] == undefined` → `true`
  * Ei tule käyttää paitsi perustellusti ja kommentin kera

*`NaN` on epätosi itsensä kanssa. Esimerkiksi:
`123 * 'moi' === NaN` → `false`

[Vertailutavat MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## Truthy ja falsy

* Kaikki arvot ovat booleaniksi muutettuna joko tosia tai epätosia
* Arvo voidaan kääntää vastakkaiseksi `!`-operaattorilla: `if (!moo) {...}`
* Säännöt kannattaa opetella, jotta koodi pysyy lyhyenä ja luettavana
  * Riittää kun osaa Falsy-säännöt – muut ovat truthy
  * Yleensä on syytä tehdä vain vähimmäistarkistukset ja luottaa siihen, ettei funktiota kutsuta väärillä parametreilla
    * ~~`if (moo === false) {}`~~ → `if (!moo) {}`
  * Kaikenkattavia tarkistuksia olisi työlästä kirjoittaa
  * Ohjelman suoritus halutaan pitää mahdollisimman kevyenä

| Falsy       |
| ----------- |
| `false`     |
| `null`      |
| `undefined` |
| `0`         |
| `NaN`       |
| `''`        |

| Truthy       |
| ------------ |
| `true`       |
| `{}`         |
| `[]`         |
| `31`         |
| `'moo'`      |
| `new Date()` |
| `-31`        |
| `3.14`       |
| `-3.14`      |
| `Infinity`   |
| `-Infinity`  |

## Loogiset operaattorit && ja ||

* `&&`-operaattori ottaa kaksi arvoa
  * Jos *vasen* puoli on *falsy*, operaattori palauttaa *vasemman* puolen arvon **sellaisenaan**
  * Jos *vasen* puoli on *truthy*, operaattori palauttaa *oikean* puolen arvon **sellaisenaan**
* `||`-operaattori ottaa kaksi arvoa
  * Jos *vasen* puoli on *falsy*, operaattori palauttaa *oikean* puolen arvon **sellaisenaan**
  * Jos *vasen* puoli on *truthy*, operaattori palauttaa *vasemman* puolen arvon **sellaisenaan**
* Truthy- ja falsy-testaus yhdistetään usein ja- ja tai-operaatioihin
  * Syy on sama, jotta koodi pysyy lyhyenä
* Normaalien vertailujen lisäksi näitä hyödynnetään objektin *propertyn* arvon lukemisessa, jos on epävarmaa, onko muuttujassa ylipäänsä objekti, vai onko se esimerkiksi `undefined` (`undefined`-arvolta ei saa suoraan kysyä propertyä) ja oletusarvojen antamisessa.
```js
// `henkilö`-objektista halutaan lukea nimi omaan muuttujaan. Jos on
// epävarmaa, onko `henkilö`-muuttujan arvo objekti vai esimerkiksi
// undefined, voidaan käyttää &&-operaattoria.
const nimi = henkilö && henkilö.nimi;
if (nimi) {
  // Tänne mennään, jos `henkilö`` on truthy ja sillä on "nimi"-property,
  // joka sekin on truthy. Oletetaan, että henkilö on objekti, eikä
  // esimerkiksi 123, joka myöskin olisi truthy. Jos nimi on '' (tyhjä
  // teksti), tänne ei mennä, koska tyhjä teksti on falsy.
  console.log('Henkilön nimi on:', nimi);
}

// ||-operaattoria voidaan käyttää default-arvojen antamiseen. Jos nimeä
// ei ole, tulostetaan: 'Henkilön nimi on: (ei nimeä)'.
console.log('Henkilön nimi on:', nimi || '(ei nimeä)');
```
* ES2015-standardin funktioiden [default-parametrit](https://babeljs.io/learn-es2015/#ecmascript-2015-features-default-rest-spread) korvaavat osittain `||`-operaattorin käyttöä.

[Loogiset operaattorit MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

## Objektit ja prototyyppiketju

* Kaikki on objekteja
* Objekteilla on propertyjä
* Propertyihin päästään käsiksi `.` ja `[]` -notaatioilla
`x.prop === x['prop']`
  * `[]` käytetään, jos nimessä on erikoismerkkejä tai arvo tulee muuttujasta
* Objektilla on erikois-property `__proto__`, joka on viittaus toiseen objektiin
* Kun objektista **obj** luetaan property **x** (`obj.x`):
  1. Katsotaan ensin onko sennimistä omissa propertyissä
  1. Jos ei ole, katsotaan löytyykö `obj.__proto__.x`
  1. Prototype on tavallinen objekti, joten jos sillä ei ole **x**-propertyä, katsotaan löytyykö `obj.__proto__.__proto__.x` jne. kunnes property löytyy tai prototypeä ei ole
* Kirjoitus tehdään aina objektiin itseensä:
`obj.x = 123;`

## Näkyvyysalueet

* Lohko `{ ... koodia ... }`, kuten funktio tai `if`-lause luo näkyvyysalueen*
  * Myös moduulitiedoston sisällä on oma näkyvyysalue – moduulitiedoston päätasolla esitellyt muuttujat eivät ole globaaleja
* Muuttujia etsitään ensin näkyvyysalueen sisältä
  * Jos näkyvyysalueen sisällä ei ole määritetty kyseistä nimeä, siirrytään etsimään ulommasta näkyvyysalueesta, kunnes ollaan päätasolla ja etsitään globaaleja muuttujia

```js
const x = 1;
function test() {
  const x = 2;
  if (true) {
    const x = 3;
    console.log(x);  // => 3
  }
  console.log(x);  // => 2
}
console.log(x);  // => 1
```

*Koskee ES2015:ssä esiteltyjä `let`- ja `const`-muuttujia. `var`-muuttujien näkyvyysalue on funktio. Suositus on käyttää `const`:ia jos mahdollista, muuten `let`:ia.

Lisätietoa [näkyvyysalueista](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)- ja [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)-muuttujista MDN:ssä.

## Funktion määritys ja "nosto" (hoisting)

* `function f() { ... }` -tavalla määritelty funktio nostetaan näkyvyysalueen alkuun ja on käytettävissä missä tahansa näkyvyysalueen sisällä
* `const f = function () { ... };`-tavalla määritelty funktio on käytössä kyseisen rivin jälkeen, missä sijoitus tehdään

```js
console.log(f()); // => 123
console.log(g()); // ReferenceError: g is not defined

function f() {
  return 123;
}

const g = function () {
  return 456;
};
```

[Hoisting MDN:ssä](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

## This-arvo (1/3)

### Funktion sisällä on 2 erikoisarvoa `arguments` ja `this`

#### `arguments`:
* Taulukon kaltainen objekti, jossa on viittaukset funktion saamiin argumentteihin
* ES2015 rest-toiminto (`...`-operaattori) tekee `arguments`:sta tarpeettoman
```js
function f(a, b, ...muut) {
  console.log('Eka', a); // => Eka 1
  console.log('Toka', b); // => Toka 2
  console.log('Muut', muut); // => Muut [3, 'a', 'b']
}
f(1, 2, 3, 'a', 'b');
```

#### `this`:
* `null` tai viittaus johonkin objektiin
* Riippuu funktion **määritys- ja/tai kutsutavasta** →

## This-arvo (2/3)

### Propertynä kutsuttuna this-arvo on `.`-merkin vasemmanpuoleinen arvo:
```js
obj.f(); // f-funktion sisällä: this === obj
```
  * Ei ole merkitystä, miten funktio on liitetty objektiin tai tuleeko funktio objektin prototypestä
### This-arvo kadotetaan, jos kutsua ei tehdä välittömästi:
```js
const f = obj.f;
f(); // f-funktion sisällä: this === null
```

### Voidaan luoda kokonaan uusi funktio ja hyödyntää näkyvyysalueita, jotta kutsu tehdään `.`-notaatiolla:
```js
const g = function () {
  obj.f(); // f-funktion sisällä: this === obj
};
g();
```

### Tavallisen funktion this-arvo voidaan lukita:
```js
const g = obj.f.bind(obj);
g(); // f-funktion sisällä: this === obj
```
* Arvoon `g` asetetaan `f`-funktiosta versio, jonka this-arvo on lukittu viittaamaan arvoon `obj`

[ES2015 arrow-funktiot](https://babeljs.io/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this) helpottavat this-arvon käsittelyä.

## This-arvo (3/3)

* Virtuaaliset metodit / funktioiden lainaus

`obj::h(1, 2, 3);` [Esitetty standardiin](https://github.com/tc39/proposal-bind-operator) :fireworks:

`h.call(obj, 1, 2, 3);`

`h.apply(obj, [1, 2, 3]);`

Kaikki yllämainitut suorittavat funktion `h` argumenteilla `1`, `2`, `3`. Funktion sisällä `this === obj`.

## Sisäänrakennetut ominaisuudet

### JavaScriptistä löytyy joitain globaaleita muuttujia, jotka toimivat prototyyppinä perustyypeille. Esimerkiksi:
* **String** saa protyypikseen `String.prototype`-objektin
  * `const myString = 'moo';`
* **Taulukko** saa protyypikseen `Array.prototype`-objektin
  * `const myArray = [1, 2, 3];`
* **Objekti** saa protyypikseen `Object.prototype`-objektin
  * `const MyObject = { a: 1, b: 2 };`

### Prototyypissä olevat funktiot tulevat instanssille käyttöön

`console.log('moo'.toUpperCase()); // => 'MOO'`
1. Luodaan uusi string-arvo (`'moo'`)
1. Etsitään property (`.toUpperCase`)
1. Arvolla ei ole sennimistä propertyä
1. Katsotaan löytyykö property prototyypistä (`'moo'.__proto__.toUpperCase`)
1. Protototyypistä löytyy `toUpperCase` (`String.prototype.toUpperCase`)
1. Suoritetaan funktio (`()`)
    * Koska funktiota kutsutaan `.`-notaatiolla, funktion sisällä this-arvo viittaa `.`-merkin vasemmanpuoleiseen arvoon, eli arvoon `'moo'`
1. Funktio palauttaa tekstin isoin kirjaimin, joka tulostetaan

## Esimerkkejä sisäänrakennetuista ominaisuuksista

### Prototyyppifunktioita
| Funktio  | Lyhyesti | Esimerkki |
| - | - | - |
| `String.prototype.indexOf` | Palauttaa indeksin josta merkkijono löytyy, tai -1 | `'moo'.indexOf('oo'); // 1` |
| `String.prototype.includes` | Palauttaa `true` tai `false`, riippuen löytyykö etsitty teksti | `'moo'.includes('f'); // false` |
| `String.prototype.split` | Palauttaa taulukon, jonka arvoina on merkkijono katkaistuna valitun erotintekstin kohdista | `'moo'.split(''); // ['m', 'o', 'o']` |
| `Array.prototype.indexOf` | Palauttaa indeksin, josta etsittävä arvo löytyy `===` vertailua käyttäen, tai -1 | `['m', 0, 'o'].indexOf(0); // 1` |
| `Array.prototype.includes` | Palauttaa `true` tai `false`, riippuen löytyykö etsitty arvo | `['m', 0, 'o'].includes(0); // true` |
| `Array.prototype.find` | Palauttaa elementin arvon tai `undefined`, riippuen palauttaako parametrina annettava testifunktio truthy-arvon | `['m', 0, 'o'].find(item => item === 'm'); // 'm'` |
| `Array.prototype.filter` | `.find`-kaltainen, mutta palauttaa uuden taulukon, joka sisältää alkuperäisen taulukon entryt, joiden kohdalla parametrina annettava testifunktio palauttaa truthy-arvon | `['m', 0, 'o'].filter(item => item === 'm'); // ['m']` |
| `Array.prototype.map` | Palauttaa uuden taulukon, jossa jokaisella alkuperäisen taulukon entryllä kutsutaan funktiota ja funktiokutsujen tulokset asetetaan uuden taulukon arvoiksi | `[1, 2, 3].map(x => 2 * x); // [2, 4, 6]` |
| `Array.prototype.join` | Liittää taulukon tekstiksi käyttäen mahdollista erotinmerkkijonoa | `[1, 2, 3].join('-'); // '1-2-3'` |

### Staattisia funktioita
| Funktio  | Lyhyesti | Esimerkki |
| - | - | - |
| `Object.keys` | Palauttaa objektin omien propertyjen nimet taulukkona | `Object.keys({ a: 1, b: 2 }); // ['a', 'b']` |
| `Object.values` | Palauttaa objektin omien propertyjen arvot taulukkona | `Object.values({ a: 1, b: 2 }); // [1, 2]` |
| `Object.entries` | Palauttaa objektin omat propertyt key, value -pareina | `Object.entries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]` |
| `Array.isArray` | Palauttaa `true` tai `false`, riippuen onko annettu parametri taulukko-objekti | `Array.isArray([1, 2, 3]);  // true` |

Usein `Object.keys`, `values` ja `entries` ovat hyödyllisiä yhdistettynä `Array`-funktioihin, kuten `map` ja `filter`.

[Täydellinen lista globaaleista objekteista MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

# Linkkejä

### [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* Hyvät koodauskäytännöt jotka opettavat myös teoriaa
### [Crockford on JavaScript – Volume 1...Section 8](https://www.youtube.com/playlist?list=PLEzQf147-uEpvTa1bHDNlxUL2klHUMHJu)
* Erinomainen videosarja JavaScriptistä ja hieman ohjelmoinnista yleisestikin
* Pieniltä osin vanhentunut
  * Uuden syntaksin nuolifunktiot ja luokat helpottavat this-arvon käsittelyä ja luokkien käyttöä
### [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* Mozilla Developer Network – JavaScript

# Tehtävä

1. Avaa Babel REPL <a href="https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=env%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&targets=&browsers=&builtIns=false&debug=false&experimental=true&loose=false&spec=false&code=function%20transform(text)%20%7B%0A%20%20return%20text%3B%0A%7D%0Aconsole.log(transform('testi%C3%A4'))%3B" target="_blank">tästä</a>
1. Muokkaa `transform`-funktiota siten, että se paluttaa tekstin, jossa `text`-parametrin kirjaimet ovat siirretty QWERTY-näppäimistössä oikealle, eli `q` → `w`, `a` → `s`, `ä` → `a`, jne.
   * Käytä ratkaisussa läpikäytyjä String- ja Array-prototyyppien funktioita
   * Pyri funktionaaliseen ratkaisuun
     * Vältä `while`- ja `for`-rakenteita ja `let`- ja `var`-muuttujia

### Lisätehtävä
1. Siirtofunktio toiseen suuntaan, jolla "salakirjoituksen" voi purkaa
1. Yhteisen toiminnallisuuden erotus omiin funktioihin
1. Numeroiden käsittely: `1` → `2`, `2` → `3`, ...`0` → `1`
1. Isojen kirjainten käsittely
1. Erikoismerkkien käsittely
   * Erikoismerkit palautetaan sellaisenaan

### Esimerkkiratkaisu
```js
const rows = ['qwertyuiopå', 'asdfghjklöä', 'zxcvbnm'];
const charLists = [
  ...rows,
  ...rows.map(row => row.toUpperCase()),
  '1234567890'
];

const transform = transformer => text =>
  text.split('').map(char => {
    const chars = charLists.find(list => list.includes(char));
    return chars
      ? transformer(chars.indexOf(char), chars)
      : char;
  }).join('');

const shiftRight = transform((index, chars) => {
  const i = index + 1;
  return i < chars.length
    ? chars[i]
    : chars[0];
});

const shiftLeft = transform((index, chars) => {
  const i = index - 1;
  return i < 0
    ? chars[chars.length - 1]
    : chars[i];
});

console.log(shiftRight('Moi! testiä 123')); // => 'Zpo! yrdyoa 234'
console.log(shiftLeft('Zpo! yrdyoa 234')); // => 'Moi! testiä 123'
```
