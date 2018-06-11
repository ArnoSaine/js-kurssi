# Esimerkkejä

### Hyviä ja huonoja laillisia JSON-merkkijonoja

* Toteuta omat rajapinnat hyvin ja vältä näitä virheitä
* Älä kirjoita tai parsi JSON:ia käsin vaan käytä valmiita kirjastoja \(JavaScriptissä globaali muuttuja `JSON`\)

#### Väärin 👎

* Päätasolla on objekti, vaikka välitetään jokin yksittäinen tieto

```javascript
{"pi":3.14159265359}
```

```javascript
{"labels":["a","b","c"]}
```

#### Oikein 👍

* Päätasolla voi olla muukin kuin objekti

```javascript
3.14159265359
```

```javascript
["a","b","c"]
```

```javascript
"moo"
```

```javascript
null
```

#### Väärin 👎

* Boolean-arvo välitetään tekstinä

```javascript
{"a":[4,5,6],"b":"true"}
```

#### Oikein 👍

* Boolean-arvo ilman lainausmerkkejä

```javascript
{"a":[4,5,6],"b":true}
```

#### Väärin 👎

* Käytetään objektia, kun listataan asioita
* Käytetään ID-arvona numero-tyyppiä
  * Vaikka ID olisikin numero, on String-tyyppi usein varmempi valita

```javascript
{
  "0": {
    "_id": 0,
    "name": "Alice"
  },
  "1": {
    "_id": 1,
    "name": "Bob"
  }
}
```

#### Oikein 👍

* Listoissa käytetään taulukoita
  * Taulukko on helpompi käydä läpi
  * Voidaan tarvittaessa muuntaa objektiksi vastaanottajan päässä
  * `Array.prototype.find` löytää yksittäisen entryn esimerkiksi `_id`-perusteella
* ID:nä käytetään Stringiä

```javascript
[
  {
    "_id": "0000",
    "name": "Alice"
  },
  {
    "_id": "0001",
    "name": "Bob"
  }
]
```

#### Väärin 👎

* Käytetään `null`-arvoa, jos tieto puuttuu
  * JavaScriptissä `null`-arvoa tulisi käyttää vain jos siihen on erityinen syy
    * `null` hankaloittaa [ES2015 oletusarvojen](https://babeljs.io/learn-es2015/#default--rest--spread) käyttämistä
      * Toiminto olettaa että `null` on tarkoituksella asetettu
      * Vain `undefined`-arvot korvataan oletusarvoilla

```javascript
{
  "_id": "0000",
  "born": null,
  "favouriteBand": null,
  "name": "Alice"
}
```

#### Oikein 👍

* Puuttuvat tiedot jätetään asettamatta

```javascript
{
  "_id": "0000",
  "name": "Alice"
}
```

#### Väärin 👎

* Käytetään tarpeettoman tarkkoja property-nimiä

```javascript
{
  "personAge": 32,
  "personName": "Alice"
}
```

#### Oikein 👍

* Propertyjen nimissä ei ole ylimääräisiä toistuvia termejä
  * Asiayhteydestä selviää, mistä objektista ja propertyistä on kyse \(hyvä ohje myös muuttujien nimeämiseen koodissa\)

```javascript
{
  "age": 32,
  "name": "Alice"
}
```

