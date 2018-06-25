# Utility-funktiot

* Kaikkea uudelleenkäytettävyyttä ei voi toteuttaa komponentteina
* Joustava ja tehokas tapa siirtää pieniä toimintoja uudelleenkäytettäväksi ympäri sovellusta, on tehdä siitä funktio
  * Välttämättä ei vielä tiedetä, mihin suuntaan ohjelman tarpeet kehittyvät
  * Koskee yleisesti JavaScript-sovelluksia, ei ainoastaan React-sovelluksia
* Utility-tiedostoja voi olla eri tarkoituksiin
  * Jos toimintoja on paljon, ne ovat isoja tai muuten jaettavissa loogisesti erilleen, kannattaa toimintoja jakaa useampaan tiedostoon

{% code-tabs %}
{% code-tabs-item title="./src/utils.js" %}
```jsx
// Käytetään nimettyjä exporteja.
export const double = number => 2 * number;
export const obj = {
  x: 'abc',
  y: 123
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="./src/app.js" %}
```jsx
import { double, obj } from './utils';

function f() {
  console.log(double(3), obj.x); // => 6, "abc"
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

