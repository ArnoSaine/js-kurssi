# Rest spread \(“muut”-operaattori\)

### Tehdään uusi taulukko, jossa on lisäksi arvot `"x"` ja `"y"`

```javascript
const uusiTaulukko = [...taulukko, 'x', 'y'];
```

### Tehdään uusi objekti, jossa on henkilö-objektin propertyt kopioituna, sekä uusia propertyjä

```javascript
const henkilöKopio = { a: 1, b: 2, ...henkilö, nimi: '(tuntematon)' };
```

* Objektin kukin päätason property kopioidaan uuteen objektiin
  * Kopio ei ole ns. _deep-copy_
* Jos objekteilla on samannimisiä propertyjä, listassa jälkimmäinen arvo jää voimaan
* Objektien _rest spread_ on tällä hetkellä [stage 3](https://babeljs.io/docs/en/babel-preset-stage-3):ssa

