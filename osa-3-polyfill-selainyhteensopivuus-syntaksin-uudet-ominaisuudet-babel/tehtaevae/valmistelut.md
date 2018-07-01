# Valmistelut

1. Asenna [Node.js](https://nodejs.org/)
2. Asenna editoriisi [Prettier](https://github.com/prettier/prettier#editor-integration)
   * Laita asetuksista koodimuotoilu päälle aina kun tiedosto tallennetaan
     * **Ohjeet Atom-editoriin**
       * Asennus
         * _File &gt; Settings &gt; Install &gt; “autosave” & “prettier”_
       * Asetukset
         * _File &gt; Settings &gt; Packages &gt; “autosave” &gt; Settings &gt;_  ☑️ _Enabled_
         * _File &gt; Settings &gt; Packages &gt; “prettier” &gt; Settings &gt;_  ☑️ _Format Files on Save_
3. Tallenna [esimerkkiprojekti](https://github.com/ArnoSaine/npm-package-expert) ja suorita `npm install`, **tai** tee vaiheet 4-7
4. Tee uusi projekti

   ```bash
   mkdir npm-package-expert
   cd npm-package-expert
   npm init -y
   ```

5. Asenna projektin riippuvuudeksi Babel, Env preset ja Stage 3 preset, sekä Koa -palvelin-framework \(`--save-dev` lisää asennettavat riippuvuudet `package.json`-tiedostoon\)

   ```bash
   npm install --save-dev @babel/cli @babel/node @babel/core @babel/preset-env @babel/preset-stage-3 koa koa-static
   ```

6. Korvaa `package.json`-tiedoston `main`- ja `scripts`-kentät näillä määrityksillä, ja lisää `private`-määritys

   ```javascript
   {
     "main": "server",
     "scripts": {
       "build": "babel src --out-dir lib --source-maps",
       "dev": "npm run build -- --watch",
       "start": "babel-node ."
     },
     "private": true
   }
   ```

   * `scripts`-kenttään määritetään muun muassa paketin julkaisuun liittyviä skriptejä, sekä omavalintaisia komentoja
   * Yllä mainitut skriptit ovat omavalintaisia ja niitä voi kutsua skriptin nimellä \(`npm run <skriptin nimi>`\), esimerkiksi: `npm run build`
     * Poikkeuksena `start`, jota kutsutaan `npm start`
     * [Lisätietoa package.json -tiedostosta](https://docs.npmjs.com/files/package.json)

7. Lisää projektikansioon seuraavat tiedostot, kukin oikeaan hakemistoon

{% code-tabs %}
{% code-tabs-item title="api/top-packages.json" %}
```javascript
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
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="src/index.js" %}
```javascript
const button = (onClick, children) =>
  `<button onClick="${onClick.replace(/"/g, '&quot;')}">
    ${children}
  </button>`;

const h1 = children => `<h1>${children}</h1>`;

class App {
  constructor(root) {
    this.root = root;
    this.state = { counter: 0 };
    this.setState();
  }
  setState(nextState) {
    this.state = {...this.state, ...nextState};
    this.root.innerHTML = this.render();
  }
  increase() {
    this.setState({ counter: this.state.counter + 1 });
  }
  decrease() {
    this.setState({ counter: this.state.counter - 1 });
  }
  render() {
    return `
      ${h1('Counter')}
      <div>${this.state.counter}</div>
      ${button('app.decrease()', '-')}
      ${button('app.increase()', '+')}
    `;
  }
}

const app = new App(document.getElementById('root'));
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title=".babelrc" %}
```javascript
{
 "presets": [
   [
     "@babel/preset-env", {
       "targets": {
         "browsers": ["last 2 versions", "safari >= 7"],
         "node": "current"
       }
     }
   ],
   "@babel/preset-stage-3"
 ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title=".gitignore" %}
```text
/lib/
/node_modules/
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="index.html" %}
```markup
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>npm Package Expert</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="/lib/index.js"></script>
  </body>
</html>

```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="server.js" %}
```javascript
import serve from 'koa-static';
import Koa from 'koa';

const app = new Koa();

app.use(serve('.'));

app.listen(3000);

console.log('listening on port 3000');
```
{% endcode-tabs-item %}
{% endcode-tabs %}

