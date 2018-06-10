# This-arvo \(2/3\)

### Propertynä kutsuttuna this-arvo on `.`-operaattorin vasemmanpuoleinen arvo:

```javascript
obj.f(); // f-funktion sisällä: this === obj
```

* Ei ole merkitystä, miten funktio on liitetty objektiin tai tuleeko funktio objektin prototypestä

### This-arvo kadotetaan, jos kutsua ei tehdä välittömästi:

```javascript
const f = obj.f;
f(); // f-funktion sisällä: this === undefined
```

### Voidaan luoda kokonaan uusi funktio ja hyödyntää näkyvyysalueita, jotta kutsu tehdään `.`-notaatiolla:

```javascript
const g = function() {
  obj.f(); // f-funktion sisällä: this === obj
};
g();
```

### Tavallisen funktion this-arvo voidaan lukita:

```javascript
const g = obj.f.bind(obj);
g(); // f-funktion sisällä: this === obj
```

* Arvoon `g` asetetaan funktiosta `f` versio, jonka this-arvo on lukittu viittaamaan arvoon `obj`

[ES2015 arrow-funktiot](https://babeljs.io/learn-es2015/#arrows-and-lexical-this) helpottavat this-arvon käsittelyä.

