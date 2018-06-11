# JSON

* Tekstimuotosta dataa
* Muunnettavissa helposti JavaScript-muuttujaksi ja päinvastoin

```javascript
// JSON-merkkijono muuttujassa.
const json = '{"a":1,"b":2}';
// Muunnos JavaScript-objektiksi.
const data = JSON.parse(json);
// Uuden propertyn asettaminen.
data.c = ['moo'];
// Muunnos JSON-merkkijonoksi ja tulostus.
// (Parametrit null ja 2 ovat "pretty print" -tulostusta varten)
console.log(JSON.stringify(data, null, 2)); // =>
// {
//   "a": 1,
//   "b": 2,
//   "c": [
//     "moo"
//   ]
// }
```

