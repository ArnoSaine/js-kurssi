# Kurssin sisältö

* JavaScriptin teoriaa
* Selainympäristö, DOM
* Tärkeimmät työkalut tutuiksi
* React

:fireworks:-merkillä korostetaan kohdat jotka mahdollisesti muuttuvat/vanhenevat ensimmäisenä.

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Mihin kannattaa panostaa

* JavaScriptin ymmärtämiseen
  * Erilainen kuin kenties muut tutut kielet
  * TypeScript on laajennos JavaScriptiin
    * Jos haluaa osata TypeScriptiä, täytyy osata JavaScriptiä
  * Iso osa koodista tehdään selaimeen
* Duplikaattikoodin välttämiseen *
  * Koodin ylläpito on helpompaa, kun koodirivejä on vähemmän ja muutoksia ei tarvitse tehdä useaan paikkaan
* Kirjastojen hyödyntämiseen *
  * Paljon yleiskäyttöisiä paketteja on saatavilla
* Osaamisen päivittämiseen
  * 5 vuoden takaiset parhaat käytännöt ovat tänä päivänä vanhentuneet
  * Uusia kirjastoja tulee ja työkalut kehittyvät vielä

*Palaamme näihin kun tutustumme työkaluihin.

# Mihin ei kannata panostaa

* Koodimuotoiluun
  * [Prettier](https://github.com/prettier/prettier)-työkalu korjaa muotoilut ja huomauttaa virheistä :fireworks:
* jQueryyn
  * Pienet DOM-muokkaukset tehdään selaimen natiiveilla toiminnoilla
  * Varsinaisissa sovelluksissa DOM-muokkaus tehdään Reactin, Angularin tai vastaavien toimesta
  * Selainten perustoiminnot ovat hyvin tuetut – jQuerylle ei ole tarvetta selainyhteensopivuuden kannalta
    * ~~`$(selector)`~~ → `document.querySelector(selector)` ja `document.querySelectorAll(selector)`
    * ~~`$.ajax(url)`~~ → `fetch(url)` *
    * ~~`$.each(array)`~~ → `Array.prototype.forEach`, `Object.keys`

*[Fetch API on uusissa selaimissa ja saatavilla vanhoihin selaimiin polyfillinä](https://github.com/github/fetch)
