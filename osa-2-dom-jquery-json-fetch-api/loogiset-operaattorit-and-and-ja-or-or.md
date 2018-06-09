# Loogiset operaattorit && ja \|\|

* `&&`-operaattori ottaa kaksi arvoa
  * Jos _vasen_ puoli on _falsy_, operaattori palauttaa _vasemman_ puolen arvon **sellaisenaan**
  * Jos _vasen_ puoli on _truthy_, operaattori palauttaa _oikean_ puolen arvon **sellaisenaan**
* `||`-operaattori ottaa kaksi arvoa
  * Jos _vasen_ puoli on _falsy_, operaattori palauttaa _oikean_ puolen arvon **sellaisenaan**
  * Jos _vasen_ puoli on _truthy_, operaattori palauttaa _vasemman_ puolen arvon **sellaisenaan**
* Truthy- ja falsy-testaus yhdistetään usein ja- ja tai-operaatioihin
  * Syy on sama, jotta koodi pysyy lyhyenä
* Normaalien vertailujen lisäksi näitä hyödynnetään objektin _propertyn_ arvon lukemisessa, jos on epävarmaa, onko muuttujassa ylipäänsä objekti, vai onko se esimerkiksi `undefined` \(`undefined`-arvolta ei saa suoraan kysyä propertyä\) ja oletusarvojen antamisessa.

```javascript
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

* ES2015-standardin funktioiden [default-parametrit](https://babeljs.io/learn-es2015/#default--rest--spread) korvaavat `||`-operaattorin käyttöä.
* Standardiin ehdotettu [`Nullish Coalescing`](https://github.com/tc39/proposal-nullish-coalescing) korvaa `&&` ja `||` operaattoreiden käyttöä.

[Loogiset operaattorit MDN:ssä](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

