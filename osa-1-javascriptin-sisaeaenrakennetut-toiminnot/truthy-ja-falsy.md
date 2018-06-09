# Truthy ja falsy

* Kaikki arvot ovat booleaniksi muutettuna joko tosia tai epätosia
* Arvo voidaan kääntää vastakkaiseksi `!`-operaattorilla: `if (!moo) {...}`
* Säännöt kannattaa opetella, jotta koodi pysyy lyhyenä ja luettavana
  * Riittää kun osaa _falsy_-säännöt – muut ovat _truthy_
  * Yleensä on syytä tehdä vain vähimmäistarkistukset ja luottaa siihen, ettei funktiota kutsuta väärillä parametreilla
    * Huonoin tapa: `if (moo == true) {}`
    * Huono tapa \(yleensä\): `if (moo === true) {}`
    * Parempi tapa: `if (moo) {}`
  * Kaikenkattavia tarkistuksia olisi työlästä kirjoittaa
  * Ohjelman suoritus halutaan pitää mahdollisimman kevyenä

| **Falsy** |
| --- | --- | --- | --- | --- | --- | --- |
| `false` |
| `null` |
| `undefined` |
| `0` |
| `NaN` |
| `''` |

| **Truthy** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `true` |
| `{}` |
| `[]` |
| `31` |
| `'moo'` |
| `new Date()` |
| `-31` |
| `3.14` |
| `-3.14` |
| `Infinity` |
| `-Infinity` |

