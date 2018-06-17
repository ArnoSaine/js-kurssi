# Hyödyt, haitat ja muita huomioita

### Polyfillaus standardin mukaiseksi on hyvä lähtökohta JavaScript-sovellukselle

* Voidaan käyttää kirjastoja, jotka olettavat tiettyjen ominaisuuksien löytyvän selaimesta \(ja Stack Overflowsta kopioitu koodi toimii varmemmin 😐\)
* Selainyhteensopivuus on hyvällä pohjalla
  * Polyfillit myös korjaavat natiivien toimintojen bugeja
* Omien koodien uusiokäyttö on helpompaa
  * Koodissa ei lähtökohtaisesti ole riippuvuutta ulkopuolelle vaikkapa jQueryyn ja sen tiettyyn versioon
* Sovellus käyttää natiivia toimintoa, jos se on saatavilla

### Haittoja

* Ladattava koodimäärä kasvaa hieman
* Sovelluksen käynnistysaika kasvaa hieman

### Huomioita

* Polyfillit paikkaavat vain kielen toimintoja eivätkä esimerkiksi DOM-metodeja
  * Normaalisti tämä ei ole ongelma, koska DOM:ia ei muokata suoraan, vaan esimerkiksi React-kirjaston toimesta

