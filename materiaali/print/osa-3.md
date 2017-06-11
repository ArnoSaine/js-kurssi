# Osa 3 – Sisältö

* Polyfill
* Selainyhteensopivuus
* Syntaksin uudet ominaisuudet
* Babel
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Polyfill
## Periaate

* JavaScript-kieli suunniteltiin sellaiseksi, että kun uusiin selaimiin kehitetään toimintoja, vanhojen selaimien ominaisuuksia voidaan jälkikäteen paikata ("polyfillata")

### Esimerkki

`String.prototype.includes`-metodin polyfill [MDN:ssä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes):

```js
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
```

# Hyödyt, haitat ja muuta huomioitavaa

### Polyfillaus standardin mukaiseksi on hyvä lähtökohta JavaScript-sovellukselle
* Voidaan käyttää kirjastoja, jotka olettavat tiettyjen ominaisuuksien löytyvän selaimesta (ja Stack Overflowsta kopioitu koodi toimii varmemmin :neutral_face:)
* Selainyhteensopivuus on hyvällä pohjalla
  * Polyfillit myös korjaavat natiivien toimintojen bugeja
* Omien koodien uusiokäyttö on helpompaa
  * Koodissa ei lähtökohtaisesti ole riippuvuutta ulkopuolelle vaikkapa jQueryyn ja sen tiettyyn versioon
* Sovellus käyttää natiivia toimintoa, jos se on saatavilla

### Haittoja
* Ladattava koodimäärä kasvaa hieman
* Sovelluksen käynnistysaika kasvaa hieman

### Huomioitavaa
* Polyfillit paikkaavat vain kielen toimintoja eivätkä esimerkiksi DOM-metodeja
  * Normaalisti tämä ei ole ongelma, koska DOM:ia ei muokata suoraan, vaan esimerkiksi React-kirjaston toimesta

# Käyttöönotto

### Yksittäisiä metodeja voi kopioda [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects):stä tarpeen mukaan
* Saattaa olla järkevää "legacy"-projekteissa, kun tarvitaan vain jokin tietty toiminto

### Kaikki toiminnot
* Kirjastona: [core-js](https://github.com/zloirock/core-js)-paketista (Babel-projekteissa [babel-polyfill](https://babeljs.io/docs/usage/polyfill/))
* Ulkoisena riippuvuutena: [Polyfill.io](https://polyfill.io)

# Omia havaintoja selainyhteensopivuudesta

* IE noudattaa joitain HTML-määrityksiä, eri tavalla kuin muut selaimet
  * Angular-projektin custom-attribuuttien nimissä ei pidä käyttää html:ssä varattuja sanoja, kuten `disabled` tai `for`
```html
<!-- Toimii IE:ssä epätoivotusti. Kaikki `my-component`:n sisällä olevat
inputit ym. ovat disabloitu, riippumatta funktiokutsun tuloksesta: -->
<my-component disabled="{{$ctrl.isDisabled()}}" />

<!-- OK myös IE:ssä. `MyComponent` saa disabled-attribuutin ja voi käyttää
sitä haluamallaan tavalla: -->
<my-component data-disabled="{{$ctrl.isDisabled()}}" />
```
* IE 11 ja vanhemmat eivät tue [CSS-initial](https://developer.mozilla.org/en-US/docs/Web/CSS/initial) -arvoa. Oletusarvo täytyy määrittää tarkasti haluttuun arvoon:
```scss
/* Vaihdetaan taulukot nykytyyliin ottamaan parentin enimmäisleveys.
(Normaalisti taulukon kokonaisleveys venyisi taulukon sisällön mukaan) */
table {
  width: 100%;
}

/* Myöhemmin halutaankin lisäksi `<table class="my-data-table">`, joka ei
ota 100% leveyttä vaan toimii selaimen oletusarvon mukaan. */
table.my-data-table {
  /* width: initial; Ei toimi IE 11 ja vanhemmissa */
  width: auto; /* Haluttu arvo pitää määrittää tarkasti. Oletusarvo
    `width`:n tapauksessa on `auto`. Toimii IE:ssä ja muissa. */
}
```

* Sovellusta voi pääosin kehittää valitsemallaan selaimella, mutta toiminnot on syytä testata erikseen myös IE:llä
* Suorituskyky, erityisesti raskaiden operaatioiden ns. *worst-case scenario*, on syytä testata aina IE:llä

# Syntaksin uudet ominaisuudet
## Arrow ("nuolifunktio")

### Lyhyempi syntaksi kirjoittaa "oneliner" -apufunktioita
* Mikäli funktiosta palautetaan välittömästi arvo, voidaan bodysta jättää `{}`-merkit ja `return` pois
* Jos parametreja on tarkalleen 1, voi `()`-merkit jättää pois parametrilistan ympäriltä
```js
const double = number => number * 2;
double(4); // => 8
```

### Käyttää samaa this-arvoa, jossa funktio määritetään
```js
const bob = {
  name: 'Bob',
  friends: ['Alice'],
  printFriends() {
    this.friends.forEach(name =>
      console.log(`${this.name} knows ${name}`) // => "Bob knows Alice"
    );
  }
};
```

Esimerkki pohjautuu [Learn ES2015](https://babeljs.io/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this) -sivun esimerkkiin.

# Class

### Uusi helppokäyttöisempi syntaksi funktioiden ja prototyyppimetodien esittelyyn

```js
class Puutavara {
  tulostaEsite() {
    console.log(
      `${this.tuote}: ${this.materiaali}, ${this.hinta()} €/kpl`
    );
  }
}

class Vaneri extends Puutavara {
  constructor(mitat, vahvuus, materiaali) {
    // Yläluokan rakentajakutsu. Parametrit pitää tarvittaessa välittää
    // kutsussa.
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
  // Luokan (staattisten ja tavallisten) propertyjen asetus on tällä
  // hetkellä stage 2:ssa.
  static neliöhinnat = {
    koivu: [
      { vahvuus: 4, hinta: 11.80 },
      { vahvuus: 6.5, hinta: 13.20 },
      { vahvuus: 9, hinta: 15.50 },
      { vahvuus: 12, hinta: 19.20 }
    ]
  };
}

// "Staattisia" propertyjä voidaan asettaa myös esittelyn jälkeen:
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

# Template strings

Teksti voidaan ilmaista `''`- ja `""`-merkkien lisäksi ` `` `-merkkeillä
* ` `` `merkkien sisällä voi olla rivinvaihtoja
* `${...}`-merkkien sisälle voidaan upottaa näkyvyysalueella olevia muuttujia ja mitä tahansa JavaScriptiä joka on muutettavissa arvoksi

```js
const numero = 123;
const selite = `Numero ${numero} on:
${numero % 2 ? 'pariton' : 'parillinen'}`;
console.log(selite); // => "Numero 123 on:\npariton"
```

# Destructuring (taulukoiden ja objektien "purku")

```js
const { id, nimi = '(tuntematon)' } = henkilö;
const [eka, toka, ...loput] = lista;

// Sama vanhalla syntaksilla:
const id = person.id;
const nimi = henkilö.nimi === undefined ? '(tuntematon)' : henkilö.nimi;
const eka = lista[0];
const toka = lista[1];
const loput = lista.slice(2);
```

### Johtaa järkevien nimien käyttöön
* Paikallinen muuttuja on automaattisesti samanniminen kuin objektin property

# Objektimäärityksen lyhenne

```js
const henkilö = {
  id,
  nimi
};

// Sama vanhalla syntaksilla:
const henkilö = {
  id: id,
  nimi: nimi
};
```

### Johtaa järkevien nimien käyttöön
* Paikallinen muuttuja tulee nimettyä järkevästi, mikäli sen arvo halutaan jossain vaiheessa asettaa objektille propertynä

# Rest spread ("muut"-operaattori)

### Tehdään uusi taulukko, jossa on lisäksi arvot `"x"` ja `"y"`
```js
const uusiTaulukko = [...taulukko, 'x', 'y'];
```

### Tehdään uusi objekti, jossa on henkilö-objektin propertyt kopioituna ja uusia propertyjä
```js
const henkilöKopio = { a: 1, b: 2, ...henkilö, nimi: '(tuntematon)' };
```
* Objektin kukin päätason property kopioidaan uuteen objektiin
   * Kopio ei ole ns. *deep-copy*
* Jos objekteilla on samannimisiä propertyjä, listassa jälkimmäinen jää voimaan
* Objektien rest spread on tällä hetkellä [stage 3](https://babeljs.io/docs/plugins/preset-stage-3/):ssa

# Babel

* Node.js -ohjelma
* Kääntää uuden syntaksin JavaScript-koodin vanhemmilla selaimilla yhteensopivaan muotoon
  * Syntaksiin liittyviä ominaisuuksia ei ole mahdollista polyfillata, vaan koodi on käännettävä
* Syntaksivirheet tulevat esiin käännösaikana
  * [Flow](https://flow.org/) ja [TypeScript](https://www.typescriptlang.org/) tuovat vielä parempia kirjoitus- ja käännösaikaisia apuja JavaScript-ohjelmoitiin

# Linkkejä

### [Learn ES2015](https://babeljs.io/learn-es2015/)
* Tiivis katsaus uusiin ominaisuuksiin Babelin sivuilla
### [Exploring JS](http://exploringjs.com/)
* Maksuttomia JavaScript-kirjoja uusistakin tekniikoista
