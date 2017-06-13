# Osa 4 – Sisältö

* Modularisointi ja kirjastojen käyttö
* npm
* Webpack
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Kirjastot ja modularisointi
## Yleistä

* Tietoturvasyistä koodit halutaan jakaa omalta palvelimelta
* Kirjastoja ei säilytetä projektin versionhallinnassa
  * Asennetaan kehittäjän koneelle npm:stä
* Sovellus paketoidaan yhdeksi tai useammaksi minifioiduksi tiedostoksi julkaisua varten

### Etuja
* Ei pitkää listaa vaikeasti ylläpidettäviä `<script>`-tageja
  * Jos html-sivuja oli useita, uusi JavaScript-tiedosto piti muistaa lisätä jokaiseen jossa sitä saatettiin tarvita
  * `<script>`-tagien järjestys saattoi vaihdella, koodit olivat riippuvaisia toisistaan
    * Sovelluksen käynnistysvaiheen toimintojen teko oli hankalaa
  * Listassa saattoi olla ylimääräisiä koodeja, koska kukaan ei tiennyt mitä tarvitaan

# Esimerkkikirjasto, Lodash

* Apukirjasto yleisiin toimintoihin, kuten objektien ja taulukoiden käsittelyyn
* Erinomainen [dokumentaatio](https://lodash.com/docs/) jota kannattaa selailla
  * Saattaa opettaa, miten asiat voi tehdä vielä helpommin
  * Usein etsimänsä esimerkin löytää heti ensimmäisenä
  * Jos esimerkkiä ei löydy, tekee kenties jotain väärin
* Osittain päällekäisiä toimintoja natiivien toimintojen kanssa, joten kannattaa selata myös [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects):ää :smile:

# Moduulisyntaksi

`./a.js`:
```js
// Default export
export default function moo() {
  return 'moo';
}

// Named export
export const dii = 123;
```

`./b.js`:
```js
import moo, { dii } from './a';

console.log(moo(), dii); // => "moo", 123
```

### Polut
* `.`-alkuisena polku on suhteellinen tiedostoon, jossa `import` tehdään
* Muissa tapauksissa pakettia haetaan ylemmistä `node_modules`-kansioista (lähimmästä ensin) kunnes paketti löytyy tai ollaan käyttöjärjestelmän juurihakemistossa
  * `package.json`-tiedoston mukaan määräytyy, mikä tiedosto paketista jaetaan (oletuksena `index.js`)
  * Paketista voidaan voidaan hakea myös tiedosto polun mukaan
    ```js
    import moo from 'some-lib/dist/js/moo';
    ```

##### Huomioitavaa <i class="fa fa-exclamation" aria-hidden="true"></i>
* Node.js -sovelluksissa tulee käyttää toistaiseksi CommonJS-moduulisyntaksia, mikäli tiedostoja ei käännetä
  * Esimerkiksi `webpack.config.js`-tiedosto on tällainen
```js
// Import
const jotain = require('jotain');

module.export = {
  // Default export
  default: function moo() {},
  // Named export
  dii: 123
}
```

# npm
## Paketinhallintatyökalu

* Tulee Node.js:n mukana
* [npm](https://www.npmjs.com/):ssä julkaistaan käytännössä kaikki tarvittava ulkopuolinen koodi
* Käytetään riippuvuuksien ja versioiden hallintaan, sekä omiin sisäisiin paketteihin

# Käyttö

### `npm init` – Uusi tyhjä projekti
* kysyy muutamia tietoja ja tekee samaan kansioon `package.json`-tiedoston
* `-y`-optiolla komento luo tiedoston oletusarvoilla
* `package.json`-tiedoston voi luoda myös käsin
  * `name`- ja `version`-kentät ovat pakollisia
    ```json
    {
      "name": "my-app",
      "version": "0.0.0"
    }
    ```

### `npm install` – Riippuvuuksien asennus
* Ilman parametreja komento asentaa `package.json`:iin listatut `dependencies`- ja `devDependencies`-riippuvuudet `node_modules`-kansioon
##### Huomioitavaa <i class="fa fa-exclamation" aria-hidden="true"></i>
* Komento ei päivitä riippuvuutta, jos se on jo asennettu
* Suorita `npm update`, jos `package.json`-tiedoston riippuvuuksia on muutettu
  * Komento asentaa puuttuvat riippuvuudet ja päivittää paketit oikeisiin versioihin, jos versioita on muutettu

#### `npm install --save-dev some-package` – devDependencies
* Asentaa komentoon listatut paketit `node_modules`-kansioon
* `--save-dev`-optio lisää arvon `package.json`:n `devDependencies`-listaan
#### `npm install --save some-package` – dependencies
* Asentaa komentoon listatut paketit `node_modules`-kansioon
* `--save`-optio lisää arvon `package.json`:n `dependencies`-listaan

##### Huomioitavaa <i class="fa fa-exclamation" aria-hidden="true"></i>
* Jos et käytä `--save-dev` / `--save`-optiota, muista muokata `package.json`:ia käsin, jotta riippuvuus asentuu muillekin kehittäjille

### `dependencies` vai `devDependencies`?
* Normaalitilanteessa käytetään `devDependencies`
* `dependencies` käytetään jos
  * kehitettänä oleva paketti halutaan asentaa tuotantoon tai jonkin toisen paketin riippuvuudeksi npm:llä
  * ja paketti käyttää asennuksen jälkeen muita paketteja

### Muuta
Jos epäilet asennusten olevan sekaisin, `node_modules`-kansion voi poistaa ja suorittaa `npm install`-komennon uudelleen

# Paketit

* Pakettivalikoima on suuri
* Samoihin tarkoituksiin on välillä useita vaihtoehtoja
* Latausmääristä ja dokumentaation laadusta voi yrittää päätellä, mikä kannattaa valita
* Suosituin paketti on usein turvallisin valinta

# Pakettien versiointi

* Kun paketti on julkaistu tietyllä versiolla, sisältöä ei ole mahdollista muuttaa
* Muutos saadaan vain julkaisemalla uusi paketti, jossa versionumeroa on kasvatettu edellisestä
* Numeroinnissa tulisi noudattaa semver-käytäntöä, mutta pakollista sen noudattaminen ei ole
* Päivitettäessä riippuvuutena oleva paketin versiota, on turvallisinta lukea paketin *changelog*- tai *release notes* -tiedosto (löytyy usein versionhallinnasta)

### [Semver](http://semver.org/)-versionumerot – major.minor.patch
#### Major
* Muutoksia, jotka eivät ole yhteensopivia edellisen version kanssa
* Päivitetys on tehtävä harkiten – saattaa vaatia muutoksia omaan koodiin
#### Minor
* Muutoksia, jotka ovat yhteensopivia edellisen version kanssa
* Turvallista päivittää uusimpaan
#### Patch
* Bugikorjauksia
* Suositeltavaa päivittää uusimpaan

Alle 1.0 versioita pidetään epävirallisina ja ovat ilman patch-versiota (0.major.minor)

### [Semver calculator](https://semver.npmjs.com/)
* Näyttää pakettien saatavilla olevat versiot
* Auttaa pakettien käyttäjiä valitsemaan haluamansa "range":n
  * Esimerkiksi `^1.0.4` asentaa uusimman version, joka on välillä **1.0.4 – 1.x**

# Webpack
## Module Bundler

* Node.js -ohjelma
* Paketoi modulaarisen koodin yhteen tai useampaan tiedostoon (bundleen) selaimella käytettäväksi
* Käyttää ES2015-moduulisyntaksia
  * Oma sovelluskoodi ei ole Webpack-riippuvaista
* Minifioi tuotantokoodin
* Tekee sourcemap-tiedostot, jotta selaintyökaluissa näkyy todelliset lähdekooditiedostot
* Tekee tarvittaessa Sass- ym. CSS-muunnokset ja paljon muuta
* Paketointi on järkevää, koska kymmenien tai satojen pienten tiedostojen lataus yksitellen HTTP/1.1:llä on suorituskyvyn kannalta huono tapa
* Vain käytössä olevat koodit tulee mukaan bundleihin

# Toiminta

1. Webpack lukee `webpack.config.js`-tiedostossa määritetyn `entry`-pointin
2. Webpack seuraa `import`-määrityksiä, ja kerää yhteen kaikki tiedostot, johon viitataan
* Konfiguraatiosta riippuen tiedostoissa voidaan viitata myös esimerkiksi kuva- ja CSS-tiedostoihin
  * Kuvatiedoston viittaus palauttaa esimerkiksi kuvan url:n palvelimella ja CSS-tiedostot voidaan niputtaa yhteen kuten JavaScript-tiedostot

# Livereload

* Webpack käynnistetään **watch**-moodissa (`--watch`)
* Kun lähdekooditiedosto tallennetaan, bundle päivittyy siltä osin lähes välittömästi
* Selain lataa sivun uudelleen
  * React-projektissa käyttöliittymä päivittyy ilman sivulatausta

# Linkkejä

### [npm](https://www.npmjs.com/)
### [Webpack](https://webpack.js.org/)
### [SurviveJS](https://survivejs.com/)
* Webpack-kirjallisuutta

# Tehtävä

1. Asenna edellisen tehtävän projektiin Webpack, babel-polyfill, sekä seuraavat konfigurointiin ja kehitykseen liittyvät paketit
    ```
    npm install --save-dev webpack babel-loader babel-polyfill cross-env extract-text-webpack-plugin webpack-livereload-plugin css-loader file-loader style-loader url-loader
    ```
1. Lisää `webpack.config.js`:
    ```js
    const join = require('path').join;
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const LiveReloadPlugin = require('webpack-livereload-plugin');

    const production = process.env.NODE_ENV === 'production';
    const plugins = [new ExtractTextPlugin('bundle.css')];
    if (!production) {
      plugins.push(
        new LiveReloadPlugin({
          appendScriptTag: true
        })
      );
    }

    module.exports = {
      devtool: production ? 'source-map' : 'eval-source-map',
      entry: {
        app: './src/client'
      },
      output: {
        path: join(process.cwd(), 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            include: join(process.cwd(), 'src')
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
            })
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: { limit: 10000, mimetype: 'application/font-woff' }
            }
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/octet-stream'
              }
            }
          },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: { limit: 10000, mimetype: 'image/svg+xml' }
            }
          }
        ]
      },
      plugins
    };
    ```

1. Muokkaa `package.json`-tiedoston `script`-kenttiä seuraavasti
    ```json
    {
      "build": "babel src --out-dir lib --source-maps --ignore /client/",
      "bundle": "cross-env NODE_ENV=production webpack -p --progress",
      "dev": "npm run build && cross-env NODE_ENV=development webpack --progress --watch",
      "start": "node ."
    }
    ```

1. Vaihda `index.html`-tiedostossa JS-koodin sijainti URL uuteen `bundle.js`-tiedostoon ja lisää `head`:iin `bundle.css`-tiedoston lataus
    ```html
    <link href="/build/bundle.css" rel="stylesheet">
    <!-- -->
    <script type="text/javascript" src="/build/bundle.js"></script>
    ```

1. Tee `src/client/index.js`-tiedostossa `app`-muuttujasta globaali, jotta html-koodin `onclick`:eissä voidaan viitata siihen
    ```js
    // Moduulitiedoston sisällä muuttujat eivät ole globaaleja. Asetetaan
    // globaali `app`-muuttuja, jotta html-koodista voidaan kutsua sen
    // metodeja.
    window.app = new App(document.getElementById('root'));
    // const app = new App(document.getElementById('root'));
    ```

1. Käynnistä palvelin (`npm start`) ja sovelluksen kehitys (`npm run dev`)
1. Asenna [Boostrap-CSS-kirjasto](https://www.npmjs.com/package/bootstrap) npm:stä kuten aiemmatkin paketit
1. Ota `src/client/index.js`-tiedostossa Bootsrapin tyylitiedosto mukaan sovellukseen
    ```js
    import 'bootstrap/dist/css/bootstrap.css';
    /* ... */
    ```

1. Tee pelistä kivemman näköinen Bootsrapin tyyleillä. Esimerkiksi:
    ```html
    <button class="btn btn-primary">...</button>
    ```

1. Jaottele pelin koodeja omiin moduuleihin, jottei kaikki ole yhdessä pitkässä tiedostossa. Esimerkiksi:

    `src/client/card.js`:
    ```js
    export default ({ name, version, ...statistics }) => `
      <h3>${name}@${version}</h3>
      <ul>
        ${Object.entries(statistics)
          .map(([prop, value]) => `<li>${prop}: ${value}</li>`)
          .join('')}
      </ul>
    `;
    ```

    `src/client/index.js`:
    ```js
    import card from './card';
    /* ... */
    ```

1. Ota käyttöön ulkopuolisia JavaScript-kirjastoja, esimerkiksi [Lodash](https://lodash.com/)
    ```
    npm install --save-dev lodash
    ```

    ```js
    import { shuffle } from 'lodash';
    /* ... */
    this.cards = shuffle(this.cards);
    ```
