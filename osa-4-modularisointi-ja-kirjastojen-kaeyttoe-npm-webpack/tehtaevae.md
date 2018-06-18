# Tehtävä

1. Tee [nämä](https://github.com/ArnoSaine/npm-package-expert/compare/webpack) muutokset ja lisäykset edellisen projektin tehtävään
2. Käynnistä palvelin ja livereload-kehitys `npm run dev-server` 
3. Tee pelistä kivemman näköinen [Bootstrap](https://getbootstrap.com/)-kirjaston tyyleillä. Esimerkiksi:

   ```markup
   <button class="btn btn-primary">...</button>
   ```

4. Siirrä pelin koodeja omiin moduuleihin, jottei kaikki ole yhdessä tiedostossa. Esimerkiksi:

   {% code-tabs %}
   {% code-tabs-item title="src/card.js" %}
   ```javascript
   export default ({ name, version, ...statistics }) => 
     `<h3>${name}@${version}</h3>
     <ul>
       ${Object.entries(statistics)
         .map(([prop, value]) => `<li>${prop}: ${value}</li>`)
         .join('')}
     </ul>`;
   ```
   {% endcode-tabs-item %}
   {% endcode-tabs %}

   {% code-tabs %}
   {% code-tabs-item title="src/index.js" %}
   ```javascript
   import card from './card';
   /* ... */
   ```
   {% endcode-tabs-item %}
   {% endcode-tabs %}

5. Ota käyttöön ulkopuolisia JavaScript-kirjastoja, esimerkiksi [Lodash](https://lodash.com/) korttien sekoittamiseen

   ```bash
   npm install --save-dev lodash
   ```

   ```javascript
   import { shuffle } from 'lodash';
   /* ... */
   this.cards = shuffle(this.cards);
   ```



