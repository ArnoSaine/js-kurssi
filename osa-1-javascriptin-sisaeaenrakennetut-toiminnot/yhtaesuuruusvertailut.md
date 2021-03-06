# Yhtäsuuruusvertailut

* JavaScriptissä käytetään `===` ja `!==` -vertailuita
  * Eri tyypin \(`typeof`\) arvot \(esimerkiksi `function` ja `string`\) ovat aina erisuuret
  * Objektin tai funktion on viitattava samaan arvoon, jotta vertailun tulos on tosi
  * Muiden tietotyyppien kanssa arvon on oltava sama \*
* On olemassa myös `==` ja `!=` -vertailuoperaattorit
  * Ne tekevät tyyppimuunnoksia jotka aiheuttavat helposti virheitä. Esimerkiksi:
    * `[] == undefined` → `true`
    * `[0] == undefined` → `false`
    * `[1] == undefined` → `true`
  * Ei tule käyttää paitsi perustellusti ja kommentin kera

\*`NaN` on epätosi itsensä kanssa. Esimerkiksi: `123 * 'moi' === NaN` → `false`

 [Vertailutavat MDN:ssä](https://developer.mozilla.org/docs/Web/JavaScript/Equality_comparisons_and_sameness)

