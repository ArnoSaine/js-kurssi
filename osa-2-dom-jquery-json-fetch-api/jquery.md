# jQuery

* Julkaistu 2006
* DOM-muokkaus-, animointi- ja Ajax-kirjasto
* Yksinkertaisti DOM-operaatioita
  * `$`-funktio, joka käyttää CSS-valitsimia elementtien etsintään
* Toi selainyhteensopivia apufunktioita, kun standardi oli puutteellinen ja selaimet kehittyivät eri tahtia
  * Esimerkiksi:
    * `$.ajax` Ajax-toimintoihin
    * `$.each` taulukoiden ja objektien läpikäyntiin
* OK vanhoissa projekteissa datepicker- ym. widgetien käyttöön
* Tarpeeton React-, Angular-, ym. -projekteissa
  * DOM:n muokkaus tapahtuu kirjaston kautta
* Muutenkin tarpeeton IE9+ -selaimissa
  * `$(selector)` → `document.querySelector(selector)` ja `document.querySelectorAll(selector)`
  * `$.ajax(url)` → `fetch(url)`
  * `$.each(array)` → `Array.prototype.forEach`, `Object.keys`

