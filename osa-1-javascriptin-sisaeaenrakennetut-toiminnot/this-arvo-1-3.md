# This-arvo \(1/3\)

### Funktion sisällä on 2 erikoisarvoa `arguments` ja `this`

#### `arguments`:

* Taulukon kaltainen objekti, jossa on viittaukset funktion saamiin argumentteihin
* ES2015 rest-toiminto \(`...`-operaattori\) tekee `arguments`:sta tarpeettoman

```javascript
function f(a, b, ...muut) {
  console.log('Eka', a); // => Eka 1
  console.log('Toka', b); // => Toka 2
  console.log('Muut', muut); // => Muut [3, 'a', 'b']
}
f(1, 2, 3, 'a', 'b');
```

#### `this`:

* `undefined` tai viittaus johonkin objektiin
* Riippuu funktion **määritys- ja/tai kutsutavasta** →

