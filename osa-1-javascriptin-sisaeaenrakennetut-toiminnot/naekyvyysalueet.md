# Näkyvyysalueet

* Lohko `{ ... koodia ... }`, kuten funktio tai `if`-lause luo näkyvyysalueen\*
  * Myös moduulitiedoston sisällä on oma näkyvyysalue – moduulitiedoston päätasolla esitellyt muuttujat eivät ole globaaleja
* Muuttujia etsitään ensin näkyvyysalueen sisältä
  * Jos näkyvyysalueen sisällä ei ole määritetty kyseistä nimeä, siirrytään etsimään ulommasta näkyvyysalueesta, kunnes ollaan päätasolla ja etsitään globaaleja muuttujia

```javascript
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

\*Koskee ES2015:ssä esiteltyjä `let`- ja `const`-muuttujia. `var`-muuttujien näkyvyysalue on funktio. Suositus on käyttää `const`:ia, jos mahdollista, muuten `let`:ia.

Lisätietoa [näkyvyysalueista](https://developer.mozilla.org/docs/Web/JavaScript/Closures), [let](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let)- ja [const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const)-muuttujista MDN:ssä.

