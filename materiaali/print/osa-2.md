# Osa 2 – Sisältö

* DOM
* jQuery
* JSON
* Fetch API
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# DOM
## Document Object Model

### Rajapinta HTML- ja XML-dokumenttien käsittelyyn
* Sivun muokkaus selaimessa ilman sivulatauksia
* `document`
  * Globaali muuttuja, jossa metodit ovat
* `document.body`
  * Sivun juurielementti

## Muokkaus

### Elementin etsintä ja tyylin muokkaus
```js
const h1 = document.querySelector('.exerslide-slide h1');
if (h1) {
  // style-objektissa on elementin inline-tyylit.
  h1.style.backgroundColor = 'lime';
  // JavaScriptillä asetetut arvot voi myös lukea.
  console.log(h1.style.backgroundColor); // => "lime"
}
```

### Uuden elementin lisäys dokumenttiin
```js
const strong = document.createElement('strong');
const content = document.createTextNode('Jee!');
strong.appendChild(content);
const parent = document.querySelectorAll('.exerslide-slide h2')[1];
parent.appendChild(strong);
```

### Elementtien poisto
```js
// Etsitään kaikki `exerslide-slide`-CSS-luokan sisällä olevat h2
// -elementit.
const h2NodeList = document.querySelectorAll('.exerslide-slide h2');
// Käydään lista läpi.
// remove-funktiota kutsutaan listan jokaisella elementillä.
h2NodeList.forEach(remove);

// Poistaa parametrina annetun elementin parentiltaan.
function remove(element) {
  // Yksittäisen elementin poisto
  element.parentElement.removeChild(element);
}
```
* `querySelectorAll` palauttaa [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)-tyypin objektin
  * NodeList on taulukon kaltainen, mutta sillä ei ole kaikkia taulukon metodeja
  * NodeList  voidaan muuttaa taulukoksi ES2015 spread-syntaksilla:
    * `const h2Array = [...h2NodeList];`

#### Uusissa selaimissa elementillä itsellään on `remove`-metodi (vrt. edellä, jossa poisto oli parent-elementin metodi)
```js
const h3 = document.querySelector('.exerslide-slide h3');
if (h3) {
  h3.remove();
}
```

[document.querySelector MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

[document.querySelectorAll MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

[document.createElement MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

[node.appendChild MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

[node.removeChild MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)

[childNode.remove MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)

## Events

### Tapahtumakuuntelijan lisäys elementille:
```js
const h1 = document.querySelector('.exerslide-slide h1');
if (h1) {
  h1.addEventListener('click', onClick);
}
function onClick(event) {
  event.target.style.backgroundColor = 'skyblue';
}
// Lisätyt kuuntelijat on syytä poistaa hallitusti, jotta muistivuotoja ei
// synny.
// h1.removeEventListener('click', onClick);
```

[Events-dokumentaatio MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/Events)

# jQuery

* Julkaistu 2006
* DOM-muokkaus-, animointi- ja Ajax-kirjasto
* Yksinkertaisti DOM-operaatioita
  * `$`-funktio, joka käyttää CSS-valitsimia elementtien etsintään
* Toi selainyhteensopivia apufunktioita, kun standardi oli puutteellinen ja selaimet kehittyivät eri tahtia
  * Esimerkiksi:
    * `$.ajax` Ajax-toimintoihin
    * `$.each` taulukoiden ja objektien läpikäyntiin
* OK vanhoissa projekteissa datepicker ym. widgetien käyttöön ja tekemiseen
* Enimmäkseen tarpeeton React-, Angular-, ym. -projekteissa
  * DOM:n muokkaus tapahtuu kirjaston kautta
* Muutenkin tarpeeton IE9+ -selaimissa
  * ~~`$(selector)`~~ → `document.querySelector(selector)` ja `document.querySelectorAll(selector)`
  * ~~`$.ajax(url)`~~ → `fetch(url)`
  * ~~`$.each(array)`~~ → `Array.prototype.forEach`, `Object.keys`

# JSON
## Lyhyesti

* Tekstimuotosta dataa
* Muunnettavissa helposti JavaScript-muuttujaksi ja päinvastoin
```js
// JSON-merkkijono muuttujassa.
const json = '{"a":1,"b":2}';
// Muunnos JavaScript-objektiksi.
const data = JSON.parse(json);
// Uuden propertyn asettaminen.
data.c = ['moo'];
// Muunnos JSON-merkkijonoksi ja tulostus.
// (Parametrit null ja 2 ovat "pretty print" -tulostusta varten)
console.log(JSON.stringify(data, null, 2)); // =>
// {
//   "a": 1,
//   "b": 2,
//   "c": [
//     "moo"
//   ]
// }
```

## Esimerkkejä

### Hyviä ja huonoja laillisia JSON-merkkijonoja
* Toteuta omat rajapinnat hyvin ja vältä näitä virheitä
* Älä kirjoita tai parsi JSON:ia käsin vaan käytä valmiita kirjastoja (JavaScriptissä globaali muuttuja `JSON`)

#### Väärin :confused:
* Päätasolla on objekti, vaikka välitetään jokin yksittäinen tieto
```json
{"pi":3.14159265359}
```
```json
{"labels":["a","b","c"]}
```

#### Oikein :sunglasses:
* Päätasolla voi olla muukin kuin objekti
```json
3.14159265359
```
```json
["a","b","c"]
```
```json
"moo"
```
```json
null
```

---

#### Väärin :confused:
* Boolean-arvo välitetään tekstinä
```json
{"a":[4,5,6],"b":"true"}
```

#### Oikein :sunglasses:
* Boolean-arvo ilman lainausmerkkejä
```json
{"a":[4,5,6],"b":true}
```

---

#### Väärin :confused:
* Käytetään objektia, kun listataan asioita
* Käytetään ID-arvona numero-tyyppiä
  * Vaikka ID olisikin numero, on String-tyyppi usein varmempi valita
```json
{
  "0": {
    "_id": 0,
    "name": "Alice"
  },
  "1": {
    "_id": 1,
    "name": "Bob"
  }
}
```

#### Oikein :sunglasses:
* Listoissa käytetään taulukoita
  * Taulukko on helpompi käydä läpi
  * Voidaan tarvittaessa muuntaa objektiksi vastaanottajan päässä
  * `Array.prototype.find` löytää yksittäisen entryn esimerkiksi `_id`-perusteella
* ID:nä käytetään Stringiä
```json
[
  {
    "_id": "0000",
    "name": "Alice"
  },
  {
    "_id": "0001",
    "name": "Bob"
  }
]
```

---

#### Väärin :confused:
* Käytetään `null`-arvoa, jos tieto puuttuu
  * JavaScriptissä `null`-arvoa tulisi käyttää vain jos siihen on erityinen syy
    * `null` hankaloittaa [ES2015 oletusarvojen]((https://babeljs.io/learn-es2015/#ecmascript-2015-features-default-rest-spread)) käyttämistä
      * Toiminto olettaa että `null` on tarkoituksella asetettu
      * Vain `undefined`-arvot korvataan oletusarvoilla

```json
{
  "_id": "0000",
  "born": null,
  "favouriteBand": null,
  "name": "Alice"
}
```

#### Oikein :sunglasses:
* Puuttuvat tiedot jätetään asettamatta
```json
{
  "_id": "0000",
  "name": "Alice"
}
```

---

#### Väärin :confused:
* Käytetään tarpeettoman tarkkoja property-nimiä

```json
{
  "personAge": 28,
  "personName": "Alice"
}
```

#### Oikein :sunglasses:
* Propertyjen nimissä ei ole ylimääräisiä termejä
  * Asiayhteydestä selviää, mistä objektista ja propertyistä on kyse (hyvä ohje myös muuttujien nimeämiseen koodissa)
```json
{
  "age": 28,
  "name": "Alice"
}
```

# Fetch API

* Yksinkertainen rajapinta palvelimen kanssa kommunikointiin
  * (Hieman) Kuten jQueryn `$.ajax` ([lisätietoa](https://github.com/github/fetch#caveats)). Eroina:
    * Vastaus-Promise menee virhe-(reject) -tilaan ainoastaan jos pyyntöä ei pystytä suorittamaan loppuun, esimerkiksi virheellisistä parametreista tai verkkoyhteydestä johtuen
    * Oletuksena `fetch` ei lähetä eikä vastaanota evästeitä
* `response.ok`-boolean-arvo asetetaan HTTP-statuskoodin perusteella
  * `true`, jos statuskoodi on välillä 200-299
* Uusissa selaimissa
* Saatavilla vanhoihin selaimiin [polyfillinä](https://github.com/github/fetch)

### Esimerkki:
```js
fetch('/persons.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
```

### Esimerkki ES2017 async-funktiolla *:
```js
async function listPersons() {
  const response = await fetch('/persons.json');
  const persons = await response.json();
  console.log(persons);
}
listPersons();
```

[Lisää esimerkkejä](https://github.com/github/fetch#usage)

*[Uusissa selaimissa, käännettävissä vanhoihin selaimiin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

# Tehtäviä

### Tehtävä 1
1. Avaa jokin sivu jossa on mainoksia
   * Jos käytät Adblockia, poista se käytöstä
1. Avaa selaimen konsoli (`F12`)
1. Kirjoita konsoliin koodi joka poistaa sivulta mainoksia
   * Käytä selaimen DOM-metodeja. Vinkkejä:
     * Pitkä koodi on helpompi kirjoittaa tekstieditorissa ja kopioida konsoliin
     * Koska samaa koodia tulee suoritettua ilman sivulatauksia, törmää helposti viheeseen jossa jokin muuttuja on jo määritetty
       * Ongelman voi välttää laittamalla koodin välittömästi suoritettavan funktion sisälle ([IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression))
         * `(function () { /* ... */ })();`
1. Lisää koodi selaimen kirjanmerkkeihin [bookmarklet:ina](https://fi.wikipedia.org/wiki/Sovelluskirjanmerkki). Vinkki:
   * Jos käytit IIFE:tä, riittää kun lisäät koodin alkuun `javascript:` ja tallennat sen kirjanmerkin URL:ksi

#### Lisätehtävä
1. Etsi sivu jolla `jQuery`-gobaali muuttuja on saatavilla
1. Tee vastaavia muutoksia sivun sisältöön jQuerylla
1. Toteuta jQueryn kaltainen oma funktio selaimen DOM-metodeilla, jotta jos edellisessä kohdassa käytit esimerkiksi `jQuery(selector).remove();`, voit käyttää `munKirjasto(selector).remove();`

#### Esimerkkiratkaisu
```js
function myQuery(selector) {
  // Suoritetaan query, mutta ei tehdä tulosjoukolle vielä mitään.
  const nodeList = document.querySelectorAll(selector);
  // Palautetaan objekti.
  return {
    // Tiiviimpi ES2015-syntaksi, joka määrittää objektille propertyn,
    // jonka arvo on funktio:
    remove() { // Funktio `remove` ei ota parametreja.
      // Poistetaan löydetyt elementit, mikäli `remove`:a kutsutaan.
      nodeList.forEach(element =>
        element.parentElement.removeChild(element)
      );
    }
    // Sama kuin yllä:
    // remove: function () { ... }
  };
}

const elements = myQuery('.ad-div, .ad-container');
elements.remove();
```

### Tehtävä 2
1. Avaa [Katsomo.fi](https://www.katsomo.fi/):stä jonkin ohjelman sivu, esimerkiksi [Salatut Elämät](https://www.katsomo.fi/#!/jakso/33005005/)
1. Tutki selaimen Developer Tools → Network -välilehdeltä, mitä pyyntöjä sivu tekee
   * Ohjelman jaksojen tiedot saadaan tällaisella kyselyllä: `https://www.katsomo.fi/api/web/search/categories/33005005/assets.json?size=25&start=0`
     * Jossa ohjelman ID (sama kuin osoiterivillä) on polussa, query-parametreilla asetetaan haluttujen tulosten enimmäismäärä
     1. Kokeile muuttaa kyselyn parametreja
1. Suorita selaimen konsolissa fetch-pyyntö, joka lataa ohjelmatiedot
   * Sinun tulee olla samassa osoittessa (`https://katsomo.fi`), johon pyyntö tehdään
1. Selaimen DOM-operaatioita käyttäen, poista sivulta kaikki muu sisältö ja listaa haetut ohjelmatiedot
1. Näytä listassa linkit, josta ohjelman katselu alkaa
1. Tee selaimen kirjanmerkki, joka suorittaa edellä mainitun listauksen, mikäli käyttäjä on Katsomo.fi:ssä jonkin ohjelman sivulla
   * Vinkki: sivun URL:ään pääsee käsiksi globaalin `location`-muuttujan kautta

#### Lisätehtäviä
* Tutustu seuraaviin artikkeleihin:
  * [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
  * [Learn ES2015](https://babeljs.io/learn-es2015/)

#### Esimerkkiratkaisu
```js
async function listaaOhjelmat() {
  // Luetaan nykyisen sivun osoite. Erotetaan URL:n osat talukkoon.
  const pathParts = location.href.split('/');
  // Ohjelman tunnus on indeksissä 5.
  const ohjelmanID = pathParts[5];
  if (!ohjelmanID) {
    console.log(
      'Siirry ensin jonkin ohjelman sivulle. Esim: ' +
      'https://www.katsomo.fi/#!/ohjelma/33005005/salatut-elamat'
    );
    return;
  }
  // URL kiinnostaa vain objelman ID:hen saakka.
  // Liitetään taulukko takaisin merkkijonoksi.
  const urlAlku = pathParts.splice(0, 6).join('/');
  // Haetaan ohjelmalistaus.
  const request = await fetch(
    'https://www.katsomo.fi/api/web/search/categories/' +
    ohjelmanID +
    '/assets.json?size=25&start=0'
  );
  // Luetaan JSON-data muuttujaan.
  const data = await request.json();
  // Ohjelmalistaus on data.assets.asset-taulukossa.
  const ohjelmatList = data.assets.asset.map(ohjelma =>
    // Muutetaan taulukon jokainen elementti HTML-merkkijonoksi. HTML
    // sisältää listauselementin (<li>), jonka sisällä on linkki ohjelman
    // katseluun.
    '<li>' +
      // ohjelma.@id aiheuttaisi syntaksivirheen, joten käytämme
      // vaihtoehtoista syntaksia `@id`-propertyn lukemiseen.
      // Linkki avataan uuteen välilehteen (target="_blank"), koska
      // videosoitin on tältä sivulta poistettu.
      '<a target="_blank" href="' +
        urlAlku + '/' + ohjelma['@id'] +
      '">' +
        ohjelma.subtitle +
      '</a>'+
    '</li>'
  );
  document.body.innerHTML = '<ul>' +
    // ohjelmatList on taulukko joka sisältää HTML-merkkijonoja.
    // Liitetään taulukko yhdeksi merkkijonoksi.
    ohjelmatList.join('') +
  '</ul>';
}
listaaOhjelmat();
```
