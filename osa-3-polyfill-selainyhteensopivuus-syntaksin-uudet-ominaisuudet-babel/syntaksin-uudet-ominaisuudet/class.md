# Class

### Uusi helppokäyttöisempi syntaksi funktioiden ja prototyyppimetodien esittelyyn

```javascript
class Puutavara {
  tulostaEsite() {
    console.log(`${this.tuote}: ${this.materiaali}, ${this.hinta()} €/kpl`);
  }
}

class Vaneri extends Puutavara {
  constructor(mitat, vahvuus, materiaali) {
    // Yläluokan rakentajakutsu. Parametrit pitää tarvittaessa välittää kutsussa.
    super();
    this.mitat = mitat;
    this.vahvuus = vahvuus;
    this.materiaali = materiaali;
  }
  hinta() {
    const neliöhinnat = Vaneri.neliöhinnat[this.materiaali];
    const neliöhinta = neliöhinnat.find(
      neliöhinta => neliöhinta.vahvuus === this.vahvuus
    );
    return this.mitat.x / 1000 * this.mitat.y / 1000 * neliöhinta.hinta;
  }
  // Luokan (staattisten ja tavallisten) propertyjen asetus on tällä hetkellä
  // stage 3:ssa.
  static neliöhinnat = {
    koivu: [
      { vahvuus: 4, hinta: 11.80 },
      { vahvuus: 6.5, hinta: 13.20 },
      { vahvuus: 9, hinta: 15.50 },
      { vahvuus: 12, hinta: 19.20 }
    ]
  };
}

// Staattisia propertyjä voidaan asettaa myös esittelyn jälkeen:
// Vaneri.neliöhinnat = { ... };

// Prototyyppiobjekti on käytössä ja muokattavissa kuten perinteiselläkin
// syntaksilla rakennetuissa funktioissa.
Vaneri.prototype.tuote = 'vaneri';

const levy = new Vaneri(
  {
    x: 1220,
    y: 2440
  },
  6.5,
  'koivu'
);

levy.tulostaEsite(); // => "vaneri: koivu, 39.29376 €/kpl"
```

