# Template strings

* Merkkijono voidaan ilmaista `''`- ja `""`-merkkien lisäksi ````````-merkkeillä
  * ````````merkkien sisällä voi olla rivinvaihtoja
  * `${...}`-merkkien sisälle voidaan upottaa näkyvyysalueella olevia muuttujia ja mitä tahansa JavaScriptiä joka on muutettavissa arvoksi

```javascript
const numero = 123;
const selite = `Numero ${numero} on:
${numero % 2 ? 'pariton' : 'parillinen'}`;
console.log(selite); // => "Numero 123 on:\npariton"
```



