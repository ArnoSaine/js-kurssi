# Tyypit

* JavaScriptissä on muutamia perustyyppejä:
* Tyyppi selviää `typeof`-operaattorilla
  * `typeof`-operaattori palauttaa `string`-arvon

```javascript
const num = 123;
console.log(typeof num); // => "number"
```

| `typeof x` | Esimerkki |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `'undefined'` | `undefined`, `let moo` |
| `'object'` | `{}`, `[]`, `new Date()`, `/^abc$/`, `null` |
| `'boolean'` | `true` |
| `'number'` | `123` |
| `'string'` | `'moo'` |
| `'symbol'` | `Symbol('foo')` |
| `'function'` | `function f() {}` |

