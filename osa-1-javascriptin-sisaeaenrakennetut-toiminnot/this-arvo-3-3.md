# This-arvo \(3/3\)

### Virtuaaliset metodit / funktioiden lainaus

`obj::f(1, 2, 3);` [Esitetty standardiin](https://github.com/tc39/proposal-bind-operator) 👩‍🔬

`f.call(obj, 1, 2, 3);`

`f.apply(obj, [1, 2, 3]);`

Kaikki yllämainitut suorittavat funktion `f` argumenteilla `1`, `2`, `3`. Funktion sisällä `this === obj`.

### Property-kutsu on ainoastaan vaihtoehtoinen \(normaali\) syntaksi `.call`-funktiolle

```javascript
// Funktio liitettynä objektiin ja sen kutsuminen:
obj.f(1, 2, 3);
// Sama kuin:
f.call(obj, 1, 2, 3);
```

### Tavallinen funktiokutsu vastaa this-arvon asettamista `undefined`:ksi

```javascript
// Tavallinen funktiokutsu:
f(1, 2, 3);
// Sama kuin:
f.call(undefined, 1, 2, 3);
```



