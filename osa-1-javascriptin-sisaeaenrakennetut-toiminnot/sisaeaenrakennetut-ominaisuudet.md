# Sisäänrakennetut ominaisuudet

### JavaScriptistä löytyy joitain globaaleita muuttujia, jotka toimivat prototyyppinä perustyypeille. Esimerkiksi:

* **String** saa protyypikseen `String.prototype`-objektin
  * `const myString = 'moo';`
* **Taulukko** saa protyypikseen `Array.prototype`-objektin
  * `const myArray = [1, 2, 3];`
* **Objekti** saa protyypikseen `Object.prototype`-objektin
  * `const myObject = { a: 1, b: 2 };`

### Prototyypissä olevat funktiot tulevat instanssille käyttöön

```javascript
console.log('moo'.toUpperCase()); // => "MOO"
```

1. Luodaan uusi string-arvo \(`'moo'`\)
2. Etsitään property \(`.toUpperCase`\)
3. Arvolla ei ole sennimistä propertyä
4. Mennään prototyyppiketjussa ylöspäin ja katsotaan löytyykö property prototyypistä \(`'moo'.__proto__.toUpperCase` / `Object.getPrototypeOf('moo').toUpperCase)`
5. Protototyypistä löytyy `toUpperCase` \(`String.prototype.toUpperCase`\)
6. Suoritetaan funktio \(`()`\)
   * Koska funktiota kutsutaan `.`-notaatiolla, funktion sisällä this-arvo viittaa `.`-operaattorin vasemmanpuoleiseen arvoon, eli arvoon `'moo'`
7. Funktio palauttaa this-arvossa olevan tekstin isoin kirjaimin, joka tulostetaan

