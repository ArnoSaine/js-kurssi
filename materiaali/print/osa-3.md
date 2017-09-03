# Osa 3 – Sisältö

* Polyfill
* Selainyhteensopivuus
* Syntaksin uudet ominaisuudet
* Babel
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Polyfill
## Periaate

* JavaScript-kieli suunniteltiin sellaiseksi, että kun uusiin selaimiin kehitetään toimintoja, vanhojen selaimien ominaisuuksia voidaan jälkikäteen paikata ("polyfillata")

### Esimerkki

`String.prototype.includes`-metodin polyfill [MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes):

```js
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

# Hyödyt, haitat ja muita huomioita

### Polyfillaus standardin mukaiseksi on hyvä lähtökohta JavaScript-sovellukselle
* Voidaan käyttää kirjastoja, jotka olettavat tiettyjen ominaisuuksien löytyvän selaimesta (ja Stack Overflowsta kopioitu koodi toimii varmemmin :neutral_face:)
* Selainyhteensopivuus on hyvällä pohjalla
  * Polyfillit myös korjaavat natiivien toimintojen bugeja
* Omien koodien uusiokäyttö on helpompaa
  * Koodissa ei lähtökohtaisesti ole riippuvuutta ulkopuolelle vaikkapa jQueryyn ja sen tiettyyn versioon
* Sovellus käyttää natiivia toimintoa, jos se on saatavilla

### Haittoja
* Ladattava koodimäärä kasvaa hieman
* Sovelluksen käynnistysaika kasvaa hieman

### Huomioita
* Polyfillit paikkaavat vain kielen toimintoja eivätkä esimerkiksi DOM-metodeja
  * Normaalisti tämä ei ole ongelma, koska DOM:ia ei muokata suoraan, vaan esimerkiksi React-kirjaston toimesta

# Käyttöönotto

### Yksittäisiä metodeja voi kopioda [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects):stä tarpeen mukaan
* Saattaa olla järkevää "legacy"-projekteissa, kun tarvitaan vain jokin tietty toiminto

### Kaikki toiminnot
* Kirjastona: [core-js](https://github.com/zloirock/core-js)-paketista (Babel-projekteissa [babel-polyfill](https://babeljs.io/docs/usage/polyfill/))
* Ulkoisena riippuvuutena: [Polyfill.io](https://polyfill.io)

# Omia havaintoja selainyhteensopivuudesta

* IE noudattaa joitain HTML-määrityksiä, eri tavalla kuin muut selaimet
  * Angular-projektin custom-attribuuttien nimissä ei pidä käyttää HTML:ssä varattuja sanoja, kuten `disabled` tai `for`
```html
<!-- Toimii IE:ssä epätoivotusti. Kaikki `my-component`:n sisällä olevat
inputit ym. ovat disabloitu, riippumatta funktiokutsun tuloksesta: -->
<my-component disabled="{{$ctrl.isDisabled()}}" />

<!-- OK myös IE:ssä. `MyComponent` saa disabled-attribuutin ja voi käyttää
sitä haluamallaan tavalla: -->
<my-component data-disabled="{{$ctrl.isDisabled()}}" />
```
* IE 11 ja vanhemmat eivät tue [CSS-initial](https://developer.mozilla.org/en-US/docs/Web/CSS/initial) -arvoa. Oletusarvo täytyy määrittää tarkasti haluttuun arvoon:
```scss
/* Vaihdetaan taulukot nykytyyliin ottamaan parentin enimmäisleveys.
(Normaalisti taulukon kokonaisleveys venyisi taulukon sisällön mukaan) */
table {
  width: 100%;
}

/* Myöhemmin halutaankin lisäksi `<table class="my-data-table">`, joka ei
ota 100% leveyttä vaan toimii selaimen oletusarvon mukaan. */
table.my-data-table {
  /* width: initial; Ei toimi IE 11 ja vanhemmissa */
  width: auto; /* Haluttu arvo pitää määrittää tarkasti. Oletusarvo
    `width`:n tapauksessa on `auto`. Toimii IE:ssä ja muissa. */
}
```

* Sovellusta voi pääosin kehittää valitsemallaan selaimella, mutta toiminnot on syytä testata erikseen myös IE:llä
* Suorituskyky, erityisesti raskaiden operaatioiden ns. *worst-case scenario*, on syytä testata aina IE:llä

# Syntaksin uudet ominaisuudet
## Arrow ("nuolifunktio")

### Lyhyempi syntaksi kirjoittaa "oneliner" -apufunktioita
* Mikäli funktiosta palautetaan välittömästi arvo, voidaan bodysta jättää `{}`-merkit ja `return` pois
* Jos parametreja on tarkalleen 1, voi `()`-merkit jättää pois parametrilistan ympäriltä
```js
const double = number => number * 2;
double(4); // => 8
```

### Käyttää samaa this-arvoa, jossa funktio määritetään
```js
const bob = {
  name: 'Bob',
  friends: ['Alice'],
  printFriends() {
    this.friends.forEach(name =>
      console.log(`${this.name} knows ${name}`) // => "Bob knows Alice"
    );
  }
};
```

Esimerkki pohjautuu [Learn ES2015](https://babeljs.io/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this) -sivun esimerkkiin.

# Class

### Uusi helppokäyttöisempi syntaksi funktioiden ja prototyyppimetodien esittelyyn

```js
class Puutavara {
  tulostaEsite() {
    console.log(
      `${this.tuote}: ${this.materiaali}, ${this.hinta()} €/kpl`
    );
  }
}

class Vaneri extends Puutavara {
  constructor(mitat, vahvuus, materiaali) {
    // Yläluokan rakentajakutsu. Parametrit pitää tarvittaessa välittää
    // kutsussa.
    super();
    this.mitat = mitat;
    this.vahvuus = vahvuus;
    this.materiaali = materiaali;
  }
  hinta() {
    const neliöhinnat = Vaneri.neliöhinnat[this.materiaali];
    const neliöhinta = neliöhinnat.find(
      neliöhinta => neliöhinta.vahvuus === this.vahvuus
    );
    return this.mitat.x / 1000 * this.mitat.y / 1000 * neliöhinta.hinta;
  }
  // Luokan (staattisten ja tavallisten) propertyjen asetus on tällä
  // hetkellä stage 2:ssa.
  static neliöhinnat = {
    koivu: [
      { vahvuus: 4, hinta: 11.80 },
      { vahvuus: 6.5, hinta: 13.20 },
      { vahvuus: 9, hinta: 15.50 },
      { vahvuus: 12, hinta: 19.20 }
    ]
  };
}

// "Staattisia" propertyjä voidaan asettaa myös esittelyn jälkeen:
// Vaneri.neliöhinnat = { ... };

// Prototyyppiobjekti on käytössä ja muokattavissa kuten perinteiselläkin
// syntaksilla rakennetuissa funktioissa.
Vaneri.prototype.tuote = 'vaneri';

const levy = new Vaneri(
  {
    x: 1220,
    y: 2440
  },
  6.5,
  'koivu'
);

levy.tulostaEsite(); // => "vaneri: koivu, 39.29376 €/kpl"
```

# Template strings

Teksti voidaan ilmaista `''`- ja `""`-merkkien lisäksi ` `` `-merkkeillä
* ` `` `merkkien sisällä voi olla rivinvaihtoja
* `${...}`-merkkien sisälle voidaan upottaa näkyvyysalueella olevia muuttujia ja mitä tahansa JavaScriptiä joka on muutettavissa arvoksi

```js
const numero = 123;
const selite = `Numero ${numero} on:
${numero % 2 ? 'pariton' : 'parillinen'}`;
console.log(selite); // => "Numero 123 on:\npariton"
```

# Destructuring (taulukoiden ja objektien "purku")

```js
const { id, nimi = '(tuntematon)' } = henkilö;
const [eka, toka, ...loput] = lista;

// Sama vanhalla syntaksilla:
const id = henkilö.id;
const nimi = henkilö.nimi === undefined ? '(tuntematon)' : henkilö.nimi;
const eka = lista[0];
const toka = lista[1];
const loput = lista.slice(2);
```

### Johtaa järkevien nimien käyttöön
* Paikallinen muuttuja on automaattisesti samanniminen kuin objektin property

# Objektimäärityksen lyhenne

```js
const henkilö = {
  id,
  nimi
};

// Sama vanhalla syntaksilla:
const henkilö = {
  id: id,
  nimi: nimi
};
```

### Johtaa järkevien nimien käyttöön
* Paikallinen muuttuja tulee nimettyä järkevästi, mikäli sen arvo halutaan jossain vaiheessa asettaa objektille propertynä

# Rest spread ("muut"-operaattori)

### Tehdään uusi taulukko, jossa on lisäksi arvot `"x"` ja `"y"`
```js
const uusiTaulukko = [...taulukko, 'x', 'y'];
```

### Tehdään uusi objekti, jossa on henkilö-objektin propertyt kopioituna ja uusia propertyjä
```js
const henkilöKopio = { a: 1, b: 2, ...henkilö, nimi: '(tuntematon)' };
```
* Objektin kukin päätason property kopioidaan uuteen objektiin
   * Kopio ei ole ns. *deep-copy*
* Jos objekteilla on samannimisiä propertyjä, listassa jälkimmäinen jää voimaan
* Objektien rest spread on tällä hetkellä [stage 3](https://babeljs.io/docs/plugins/preset-stage-3/):ssa

# Babel

* Node.js -ohjelma
* Kääntää uuden syntaksin JavaScript-koodin vanhemmilla selaimilla yhteensopivaan muotoon
  * Syntaksiin liittyviä ominaisuuksia ei ole mahdollista polyfillata, vaan koodi on käännettävä
* Syntaksivirheet tulevat esiin käännösaikana
  * [Flow](https://flow.org/) ja [TypeScript](https://www.typescriptlang.org/) tuovat vielä parempia kirjoitus- ja käännösaikaisia apuja JavaScript-ohjelmoitiin

# Linkkejä

### [Learn ES2015](https://babeljs.io/learn-es2015/)
* Tiivis katsaus uusiin ominaisuuksiin Babelin sivuilla
### [Exploring JS](http://exploringjs.com/)
* Maksuttomia JavaScript-kirjoja uusistakin tekniikoista

# Tehtävä
## Valmistelut

1. Asenna [Node.js](https://nodejs.org/)
1. Asenna editoriisi [Prettier](https://github.com/prettier/prettier#editor-integration)
   * Laita asetuksista koodimuotoilu päälle aina kun tiedosto tallennetaan
   * Atom-editorissa
     * Asennus:
       * *File > Settings > Install > "autosave" & "prettier"*
     * Asetukset:
       * *File > Settings > Packages > "autosave" > Settings > :ballot_box_with_check: Enabled*
       * *File > Settings > Packages > "prettier" > Settings > :ballot_box_with_check: Format Files on Save*
1. Tee uusi projekti
    ```sh
    mkdir npm-package-expert
    cd npm-package-expert
    npm init -y
    ```
1. Asenna projektin riippuvuudeksi Babel, Env preset ja Stage 2 preset, sekä Koa -palvelin-framework
    ```sh
    npm install --save-dev babel-cli babel-preset-env babel-preset-stage-2 koa koa-static
    ```
1. Korvaa `package.json`-tiedoston `main`- ja `scripts`-kentät näillä määrityksillä ja lisää `private`-määritys
    ```json
    {
      "main": "lib/server",
      "scripts": {
        "build": "babel src --out-dir lib --source-maps",
        "dev": "npm run build -- --watch",
        "start": "node ."
      },
      "private": true
    }
    ```
    * `scripts`-kenttään määritetään muun muassa paketin julkaisuun liittyviä skriptejä, sekä omavalintaisia komentoja
    * Yllä mainitut skriptit ovat omavalintaisia ja niitä voi kutsua skriptin nimellä (`npm run <skriptin nimi>`), esimerkiksi: `npm run build`
      * Poikkeuksena `start`, jota kutsutaan `npm start`
      * [Lisätietoa package.json -tiedostosta](https://docs.npmjs.com/files/package.json)
1. Lisää projektikansioon seuraavat tiedostot

    `api/top-packages.json`:
    ```json
    [
      {
        "name": "babel-cli",
        "version": "6.24.1",
        "releases": 63,
        "dependencies": 15,
        "dependents": 1726,
        "downloadsLastMonth": 1988789,
        "openIssues": 294,
        "openPullRequests": 109,
        "quality": 87,
        "popularity": 75,
        "maintenance": 99
      },
      {
        "name": "lodash",
        "version": "4.17.4",
        "releases": 100,
        "dependencies": 0,
        "dependents": 46210,
        "downloadsLastMonth": 44562576,
        "openIssues": 0,
        "openPullRequests": 0,
        "quality": 76,
        "popularity": 97,
        "maintenance": 100
      },
      {
        "name": "react",
        "version": "15.5.4",
        "releases": 119,
        "dependencies": 4,
        "dependents": 12679,
        "downloadsLastMonth": 4446041,
        "openIssues": 608,
        "openPullRequests": 118,
        "quality": 94,
        "popularity": 90,
        "maintenance": 95
      },
      {
        "name": "webpack",
        "version": "2.6.1",
        "releases": 451,
        "dependencies": 21,
        "dependents": 4055,
        "downloadsLastMonth": 6718003,
        "openIssues": 691,
        "openPullRequests": 45,
        "quality": 93,
        "popularity": 88,
        "maintenance": 78
      },
      {
        "name": "@angular/common",
        "version": "4.1.3",
        "releases": 82,
        "dependencies": 0,
        "dependents": 2296,
        "downloadsLastMonth": 1369818,
        "openIssues": 1423,
        "openPullRequests": 221,
        "quality": 84,
        "popularity": 76,
        "maintenance": 100
      },
      {
        "name": "rimraf",
        "version": "2.6.1",
        "releases": 44,
        "dependencies": 1,
        "dependents": 3996,
        "downloadsLastMonth": 20235792,
        "openIssues": 21,
        "openPullRequests": 6,
        "quality": 96,
        "popularity": 80,
        "maintenance": 86
      },
      {
        "name": "yargs",
        "version": "8.0.1",
        "releases": 138,
        "dependencies": 13,
        "dependents": 5849,
        "downloadsLastMonth": 28522602,
        "openIssues": 108,
        "openPullRequests": 3,
        "quality": 100,
        "popularity": 86,
        "maintenance": 99
      },
      {
        "name": "express",
        "version": "4.15.3",
        "releases": 252,
        "dependencies": 28,
        "dependents": 17385,
        "downloadsLastMonth": 12895865,
        "openIssues": 103,
        "openPullRequests": 45,
        "quality": 99,
        "popularity": 95,
        "maintenance": 97
      },
      {
        "name": "koa",
        "version": "2.2.0",
        "releases": 64,
        "dependencies": 24,
        "dependents": 1278,
        "downloadsLastMonth": 289573,
        "openIssues": 19,
        "openPullRequests": 9,
        "quality": 93,
        "popularity": 62,
        "maintenance": 100
      },
      {
        "name": "bootstrap",
        "version": "3.3.7",
        "releases": 16,
        "dependencies": 0,
        "dependents": 1912,
        "downloadsLastMonth": 1290099,
        "openIssues": 227,
        "openPullRequests": 62,
        "quality": 94,
        "popularity": 76,
        "maintenance": 98
      },
      {
        "name": "moment",
        "version": "2.18.1",
        "releases": 49,
        "dependencies": 0,
        "dependents": 13206,
        "downloadsLastMonth": 9319919,
        "openIssues": 192,
        "openPullRequests": 58,
        "quality": 100,
        "popularity": 92,
        "maintenance": 98
      },
      {
        "name": "chokidar",
        "version": "1.7.0",
        "releases": 71,
        "dependencies": 9,
        "dependents": 1934,
        "downloadsLastMonth": 9851092,
        "openIssues": 62,
        "openPullRequests": 5,
        "quality": 93,
        "popularity": 77,
        "maintenance": 97
      }
    ]
    ```

    `src/client/.babelrc`:
    ```json
    {
     "presets": [
       ["env", {
         "targets": {
           "browsers": ["last 2 versions", "safari >= 7"]
         }
       }],
       "stage-2"
     ]
    }
    ```

    `src/client/index.js`:
    ```js
    const button = (onClick, children) =>
      `<button onClick="${onClick}">${children}</button>`;

    const h1 = children => `<h1>${children}</h1>`;

    class App {
      constructor(root) {
        this.root = root;
        this.counter = 0;
        this.update();
      }
      update() {
        this.root.innerHTML = this.render();
      }
      increase() {
        this.counter++;
        this.update();
      }
      decrease() {
        this.counter--;
        this.update();
      }
      render() {
        return `
          ${h1('Counter')}
          <div>${this.counter}</div>
          ${button('app.decrease()', '-')}
          ${button('app.increase()', '+')}
        `;
      }
    }

    const app = new App(document.getElementById('root'));
    ```

    `src/server/.babelrc`:
    ```json
    {
     "presets": [
       ["env", {
         "targets": {
           "node": "current"
         }
       }],
       "stage-2"
     ]
    }
    ```

    `src/server/index.js`:
    ```js
    import serve from 'koa-static';
    import Koa from 'koa';

    const app = new Koa();

    app.use(serve('.'));

    app.listen(3000);

    console.log('listening on port 3000');
    ```

    `.gitignore`:
    ```
    /node_modules/
    /lib/
    ```

    `index.html`:
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>npm Package Expert</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/lib/client/index.js"></script>
      </body>
    </html>
    ```

# Tehtävä

1. Käynnistä Babel käännös watch-moodissa (komento jää auki terminaaliin)

    `npm run dev`
1. Käynnistä palvelin (toisessa terminaalissa)

    `npm start`
1. Muokkaa `src/client/index.js`-tiedostoa
    1. Hae palvelimelta `/api/top-packages.json`-tiedosto
    1. Toteuta sivulle "Top Trumps" -peli
      * Muokkaa `App`-luokkaa
      * Lisää `button` ja `h1` kaltaisia apufunktioita, jotka palauttavat HTML:ää

### Pelin säännöt
 * Kortit (tiedostossa oleva taulukko) sekoitetaan ja jaetaan 2 pakkaan
 * Pelaajalle näytetään oman pakan ylin kortti
 * Pelaajan tehtävä on veikata kortista tietoa, joka on parempi kuin vastapelaajan (tietokoneen) kortissa
   * Suurempi arvo on parempi näissä kentissä
     * `dependents`
     * `downloadsLastMonth`
     * `maintenance`
     * `popularity`
     * `quality`
     * `releases`
   * Pienempi arvo on parempi näissä kentissä
     * `dependencies`
     * `openIssues`
     * `openPullRequests`
 * Kun pelaaja on klikkaa valitsemaansa tietoa
   * Jos arvot ovat yhtäsuuret
     * Näytetään ilmoitus
     * Pelaaja veikkaa uudelleen
   * Jos arvot ovat erisuuret
      * Ohjelma näyttää molemmat kortit, kumpi pelaaja voitti kierroksen ja "Jatka"- / "Aloita alusta"-painikkeen
 * Kun pelaaja klikkaa "Jatka"-painiketta, molemmat kortit menevät voittaneen pelaajan pakan pohjalle
 * Jos molemmilla pelaajilla on kortteja jäljellä, pelataan uusi kierros
 * Peli päättyy kun toiselta pelaajalta loppuvat kortit
