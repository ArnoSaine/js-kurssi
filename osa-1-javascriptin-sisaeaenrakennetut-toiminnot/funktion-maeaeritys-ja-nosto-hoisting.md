# Funktion määritys ja "nosto" \(hoisting\)

* `function f() { ... }` -tavalla määritelty funktio nostetaan näkyvyysalueen alkuun ja on käytettävissä missä tahansa näkyvyysalueen sisällä
* `const f = function () { ... };`-tavalla määritelty funktio on käytössä kyseisen rivin jälkeen, missä sijoitus tehdään

```javascript
console.log(f()); // => 123
console.log(g()); // ReferenceError: g is not defined

function f() {
  return 123;
}

const g = function () {
  return 456;
};
```

[Hoisting MDN:ssä](https://developer.mozilla.org/docs/Glossary/Hoisting)

