# This-arvo \(3/3\)

### Virtuaaliset metodit / funktioiden lainaus

`obj::f(1, 2, 3);` [Esitetty standardiin](https://github.com/tc39/proposal-bind-operator) 👩‍🔬

`f.call(obj, 1, 2, 3);`

`f.apply(obj, [1, 2, 3]);`

Kaikki yllämainitut suorittavat funktion `f` argumenteilla `1`, `2`, `3`. Funktion sisällä `this === obj`.

