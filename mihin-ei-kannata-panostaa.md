# Mihin ei kannata panostaa

* Koodimuotoiluun
  * [Prettier](https://github.com/prettier/prettier)-työkalu korjaa muotoilut ja huomauttaa virheistä
* jQueryyn
  * Pienet DOM-muokkaukset tehdään selaimen natiiveilla toiminnoilla
  * Varsinaisissa sovelluksissa DOM-muokkaus tehdään Reactin, Angularin tai vastaavien toimesta
  * Selainten perustoiminnot ovat hyvin tuetut – jQuerylle ei ole tarvetta selainyhteensopivuuden kannalta
    * `$(selector)` → `document.querySelector(selector)` ja `document.querySelectorAll(selector)`
    * `$.ajax(url)` → `fetch(url)` \*
    * `$.each(array)` → `Array.prototype.forEach`, `Object.keys`

\*[Fetch API on uusissa selaimissa ja saatavilla vanhoihin selaimiin polyfillinä](https://github.com/github/fetch)

