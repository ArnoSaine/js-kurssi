# Osa 6 – Sisältö

* React
  * Lisää komponenteista
  * Uudelleenkäytettävien toimintojen teko
  * Kirjastoja
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# React
## Komponentin metodit ja this-arvo

### Callback-metodit täytyy toteuttaa nuolifunktiona
* this-arvo pitää bindata funktioon, mikäli this-arvoa käytetään
* Callback-funktion käyttäjä saa viittauksen vain funktioon

```js
class App extends Component {
  // Stage-2 -syntaksi.
  state = {};
  onChange = event => {
    // Callback-funktioissa on usein tarve päästä käsiksi this-arvoon.
    this.setState({
      value: event.target.value
    });
    // moo:ta Kutsutaan heti `.`-operaattorin yhteydessä.
    this.moo();
  };
  // moo voi olla tavallinen metodi.
  moo() {
    this.setState({
      moo: true
    });
  }
  render() {
    return (
      <input
        type="text"
        onChange={
          // Callback voidaan määrittää suoraan anonyyminä
          // nuolifunktiona.
          event => this.setState({ value: event.target.value })
        }
        onChange={
          // Välitetään viittaus funktioon joka on määritetty muualla.
          // Suorituskykyisin vaihtoehto, koska funktiota ei tehdä joka
          // render-kutsulla uudelleen.
          this.onChange
        }
        value={this.state.value}
      />
    );
  }
}
```

[Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

# Refs

* Viittauksilla ([refs](https://facebook.github.io/react/docs/refs-and-the-dom.html)) pääsee käsiksi alampaan komponenttiin ja DOM-elementtiin
* `ref`-propertyyn annetaan callback-funktio, jota React kutsuu, kun *child* on liitetty DOM:iin
  * Callback-funktio saa parametrina viittauksen komponentin instanssiin ja DOM-elementtien tapauksessa viittaus on suoraan DOM-elementtiin

```js
class Kauppa extends Component {
  jotain() {
    this.hinnasto.tulosta();
    this.input.focus();
  }
  render() {
    return <div>
      <Hinnasto ref={hinnasto => this.hinnasto = hinnasto} />
      <input ref={input => this.input = input} {/* ... */} />
    </div>;
  }
}
```

# Lifecycle methods

```js
class Kauppa extends Component {  
  // Mounting: Komponentti liitetään sovellukseen, metodien
  // kutsujärjestys
  // constructor()
  // componentWillMount()
  // render()
  // componentDidMount()

  // Update: Päivitysvaiheen metodit ja kutsujärjestys
  // componentWillReceiveProps()
  // shouldComponentUpdate()
  // componentWillUpdate()
  // render()
  // componentDidUpdate()

  // Unmounting: Komponentti poistuu sovelluksesta
  // componentWillUnmount()

  state = {
    hinnasto: []
  }
  constructor(props) {
    super(props);
    // Constructor ei saa olla asynkroninen, joten tehdään toiminnot
    // erillisessä metodissa
    this.lataaHinnasto();
  }
  async lataaHinnasto() {
    const response = await fetch('/hinnasto');
    const hinnasto = await response.json();
    this.setState({ hinnasto });
  }
  componentWillMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    console.log('scrolled', window.scrollY);
  }
  render() {
    return <div>...</div>;
  }
}
```

[Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

# Uudelleenkäytettävien toimintojen teko
## Utility-funktiot

* Kaikkea uudelleenkäytettävyyttä ei voi toteuttaa komponentteina
* Joustava ja tehokas tapa siirtää pieniä toimintoja uudelleenkäytettäväksi ympäri sovellusta, on tehdä siitä funktio
  * Välttämättä ei vielä tiedetä, mihin suuntaan ohjelman tarpeet kehittyvät
  * Koskee yleisesti JavaScript-sovelluksia, ei vain React-sovelluksia
* Utility-tiedostoja voi olla eri tarkoituksiin
  * Jos toimintoja on paljon, ne ovat isoja tai muuten jaettavissa loogisesti erilleen, kannattaa toimintoja jakaa useampaan tiedostoon

`./src/utils.js`:
```js
// Käytetään nimettyjä exporteja.
export const double = number => 2 * number;
export const obj = {
  x: 'abc',
  y: 123
};
```

`./src/app.js`:
```js
import { double, obj } from './utils';

function f() {
  console.log(double(3), obj.x); // => 6, "abc"
}
```

# HOC

### Higher-Order Components

* HOC-funktiolla voidaan lisätä haluttuihin komponentteihin ominaisuuksia, esimerkiksi:
  * `context`-arvo * luetaan `props`:ksi
  * Dataa palvelimelta suoraan `props`:ina

`./src/components/hoc/user.js`:
```js
export default WrappedComponent =>
  class UserHOC extends Component {
    state = {};
    async componentWillMount() {
      const response = await fetch('/api/user');
      const user = await response.json();
      this.setState({ user });
    }
    render() {
      return this.state.user
        ? <WrappedComponent {...this.props} {...this.state} />
        : <div>Ladataan käyttäjätietoja...</div>;
    }
  };
```

`./src/components/App.js`:
```js
import user from './hoc/user';

export default user(
  class App extends Component {
    render() {
      return <div>{this.props.user.name}</div>;
    }
  }
);
```

* [HOC](https://facebook.github.io/react/docs/higher-order-components.html)
* \* [Context](https://facebook.github.io/react/docs/context.html)

# Kirjastoja
## React Router

* Osoiterivin arvon ja sovelluksen näkymien synkronointi
* Käyttäjä siirtyy eri URL:iin ja näkymä muuttuu, ilman uudelleenlatausta
* Routeriin eli osoiteriville on hyvä määrittää sellaiset sovelluksen tilat,
  * joihin halutaan tarjota linkki
  * tai joihin sovelluksen sisällä navigoidaan ja halutaan tarjota selaimen "Back"-napin toiminnallisuus

[Basic example](https://reacttraining.com/react-router/web/example/basic)

# React-Bootstrap

* Bootstrap-tyylien käyttö React-komponentteina
* Kätevä kirjasto
  * Projekteissa joissa käytetään Bootstrapia, vastaava komponentti-abstraktio tulisi muuten kirjoitettua itse
* Tekee ainoastaan HTML-elementit Bootstrapin mallin mukaan
  * CSS-tiedosto ei kuulu pakettiin vaan on lisättävä erikseen

[React Bootstrap](https://react-bootstrap.github.io/)

# React Intl

* Monipuolinen kirjasto sovelluksen kääntämiseen eri kielille

```js
<FormattedMessage
  id=""
  values={{
    name: 'Eric'
  }}
/>
```

Käännöstekstien tiedostot, kuten `messages.fi-FI.properties`:
```
app.greeting = Hello, {name}!
```

[React Intl](https://github.com/yahoo/react-intl)

# react-jsonschema-form

* *JSON Schema* -määritykseen pohjautuva
  * Lomakkeen teko
  * Syötteiden validointi

[react-jsonschema-form](https://mozilla-services.github.io/react-jsonschema-form/)

# Linkkejä

### [Awesome JavaScript](https://github.com/sorrycc/awesome-javascript)
* Iso kokoelma linkkejä ryhmiteltynä aihepiireittäin
### [Awesome React](https://github.com/enaqx/awesome-react)
* Iso kokoelma linkkejä ryhmiteltynä aihepiireittäin
### [frontend-app](https://www.npmjs.com/package/frontend-app)
* React-aloituspaketti (oma <i class="fa fa-hand-peace-o" aria-hidden="true"></i>)
* [React-complete -esimerkissä](https://www.npmjs.com/package/frontend-app#react-complete) on mukana **React Router**, **React-Bootstrap** ja tyylien kustomointi sekä **React Intl**

# Tehtävä

1. Tee [Create React App](https://github.com/facebookincubator/create-react-app) -työkalulla uusi React-projekti
1. Asenna ja ota käyttöön käyttöön [react-jsonschema-form](https://www.npmjs.com/package/react-jsonschema-form)
1. Asenna ja ota käyttöön Bootstrap-CSS-tyylit
1. Tee seuraavat lomakkeet
    1. Tiedotteiden lisäys
        * Otsikko (tekstikenttä)
        * Tiedoteteksti (monirivinen tekstikenttä)
        * Julkaisupäivämäärä (selaimen oma päivämäärävalitsin)
    1. Salasanan vaihto
        * 2 salasanakenttää, joissa sama sisältö ([Custom validation](https://github.com/mozilla-services/react-jsonschema-form#custom-validation))

### Lisätehtävä 1
* Käytä lomakkeella [Airbnb React Datepicker](https://github.com/airbnb/react-dates):iä ([Custom widget components](https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components))

### Lisätehtävä 2
1. Asenna ja ota käyttöön [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
2. Siirrä lomakkeet omille sivuille
