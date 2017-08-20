# Osa 5 – Sisältö

* React
  * Taustaa
  * JSX-syntaksi
  * Hyvä tietää / yleisimmät ongelmat
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# React
## Kirjasto näkymien tekemiseen

### Yksinkertainen toimintaperiaate
* Määritetään **komponentteja**
* Komponentit voivat **koostua** toisista komponenteista
* Komponentit määrittävät saamiensa `props`:ien (parametrien) ja sisäisen `state`:n (tilan) perusteella, **miltä komponentin pitäisi kussakin tilanteessa näyttää**


### Pieni ja huomaamaton API
* Tuttu ja tehokas tapa käsitellä dataa ja luoda dataan perustuvia näkymiä (JavaScript)
* JSX-syntaksia lukuun ottamatta React on hyvin huomaamaton

# Komponenttimalli skaalautuu kaikenkokoisiin sovelluksiin

* Komponentit ovat itsessään pieniä ohjelmia
* Isokin sovellus on ulospäin vain komponentti

# Komponentit

Komponentit voivat olla joko *stateful* tai *stateless*

### *Stateful*-komponentit ovat luokkia
* Komponenteilla on käytössään sisäinen `state`
* `state`:a päivitetään `this.setState(nextState)`-funktiokutsulla
  * React yhdistää `nextState`-objektin vanhaan `state`:en ja kutsuu `render`-metodia
  * `nextState` voi olla myös funktio, joka saa parametrina edellisen `state`:n ja jonka tulee palauttaa objekti
* `props`:ien **lisäksi** *stateful*-komponentit voivat käyttää `state`:a määrittämään, miltä käyttöliittymän tulisi näyttää
```js
class Laskuri extends Component {
  state = {
    määrä: 1
  };
  lisää = () => this.setState(({ määrä }) => ({ määrä: määrä + 1 }));
  vähennä = () => this.setState(({ määrä }) => ({ määrä: määrä - 1 }));
  render() {
    return (
      <div>
        {this.state.määrä}
        <button onClick={this.vähennä}>-</button>
        <button onClick={this.lisää}>+</button>
      </div>
    );
  }
}
```

### *Stateless*-komponentit ovat yksinkertaisimmillaan pelkkiä *stateful*-komponentin `render`-funktioita
* Kuvaavat ainoastaan `props`:ien perusteella, miltä käyttöliittymän tulisi missäkin tilanteessa näyttää
* Voidaan määrittää funktiona, jonka parametrina on`props`:it ja paluuarvona React-elementtejä
  ```js
  const Puutavara = ({ nimi, hinta, tarjous }) => (
    <h2 className={tarjous ? 'tarjous' : ''}>
      {nimi}<small>{hinta.toFixed(2)} €</small>
    </h2>
  );
  ```

# One-way data flow

* `props`:eja, `state`:a sekä muita arvoja välitetään **alaspäin** toisille komponenteille
* Ylöspäin tietoa välitetään `callback`-funktioiden avulla, mikäli sellaisia on saatu itselle `props`:ssa
```js
<Puutavara nimi="Koivuvaneri" hinta={this.props.hinta} />
<button onClick={() => this.props.osta(3)}>Osta 3</button>
```

* Sovelluksessa voi olla useita *stateful*-komponentteja
* Jos komponentit eri puolilla sovellusta ovat riippuvaisia jostakin yhteisestä tiedosta (`state`), `state` pidetään niin ylhäällä, että halutut tiedot voidaan välittää alas `props`:ina molemmille komponenteille
  * Alemmat komponentit käyttävät saamiaan `props`:eja
    * `props`:eja ei normaalisti pidä kopioida alemmassa komponentissa `state`:en
  * Kun ylemmässä komponentissa `state` muuttuu, alemmatkin komponentit päivittyvät

# JSX
## HTML:n kaltainen syntaksi

### JavaScriptiä, jossa:
* `<>`-merkkien sisälle JSX:ää, jossa:
  * `{}`-merkkien sisälle JavaScriptiä, jossa:
    * `<>`-merkkien sisälle JSX:ää, jne.
```js
const materiaali = 'vaahtera';
const disabled = true;

<div>Materiaali: {materiaali}</div>
<button disabled={disabled}>Tallenna</button>
```

### JSX kääntyy `React.createElement`-funktiokutsuiksi
```js
// JSX: <div className="form-group">dii dii</div>
React.createElement(
  "div",
  { className: "form-group" },
  "dii dii"
);
```

### **Isolla** kirjaimella alkavat elementit ovat *React-komponentteja*, **pienellä** kirjaimella alkavat elementit ovat *HTML-elementtejä*
* Komponentti palauttaa HTML-elementtejä tai toisia komponentteja, jotka lopulta palauttavat HTML-elementtejä
```js
<h1>Tiedot</h1>
<Puutavara tyyppi="lauta" materiaali="mänty" />
```

# Huomioita

### Kaikki tagit on suljettava
```js
<div>
  <Header />
  <hr />
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do...
</div>
```

### Kommentit
* JSX-koodissa ei ole kommentteja
* Pitää "vaihtaa" `{}`-merkeillä JavaScriptin puolelle ja käyttää JavaScript-kommentteja
```js
<div>
  <h1>Uusi otsikko</h1>
  {/*<h1>Otsikko</h1>*/}
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do...
</div>
```

### Isoilla ja pienillä kirjaimilla on merkitystä
~~`onclick`~~, `onClick`

# Hyvä tietää / yleisimmät ongelmat
## className ja htmlFor

~~`class`~~ sijasta käytetään `className`:a ja ~~`for`~~ sijasta käytetään `htmlFor`

* `class` ja `for` ovat JavaScriptissä varattuja sanoja
```js
<label htmlFor="exampleInput">Nimi</label>
<input
  type="text"
  className="form-control"
  id="exampleInput"
/>
```

# style-property ottaa vastaan stringin sijasta objektin

* `number`-tyypin arvot muutetaan `px`-yksikköön
* CSS-määritysten nimet ovat camelCase:lla
```js
<span style={{
    bottomMargin: '.4em',
    padding: 10
}}>{nimi}</span>;
```

# Komponentista ei voi palauttaa suoraan taulukkoa

* Tulos on ympäröitävä esimerkiksi `div`:llä
* React v.16 alkaen komponentista voi palauttaa myös taulukon
```js
const Tarvikkeet = ({ tarvikkeet }) => (
  <div>
    {tarvikkeet.map(tarvike)}
  </div>
);
```

# Listauksissa elementit on merkittävä yksilöllisellä key:llä

* `key`:n avulla React optimoi DOM-operaatioita, kun taulukon elementtien järjestys tai määrä muuttuu
* `key`:n on oltava yksilöllinen vain talukon sisällä
* `key`:n arvo muutetaan `string`-tyyppiseksi
* Arvona voi usein käyttää esimerkiksi tietokanta-ID:tä, jos se on saatavilla tai muuta uniikkia arvoa
  * Viimekädessä voi käyttää taulukon indeksiä
```js
<ul>
  {henkilöt.map(({ nimi, puhelinnumero, _id }, index) => (
    <li key={puhelinnumero}>{nimi}</li>
  ))}
</ul>;
```

# Linkkejä

### [Create React App](https://github.com/facebookincubator/create-react-app)
* Virallinen React-aloituspaketti
* Webpack, Babel ym. sovellusrunko

### [React howto](https://github.com/petehunt/react-howto)
* "Your guide to the (sometimes overwhelming!) React ecosystem"

### [Thinking in React (Facebook)](https://facebook.github.io/react/docs/thinking-in-react.html)
* Perusteita, taustaa

### [React Tutorial (Facebook)](https://facebook.github.io/react/tutorial/tutorial.html)
* Perusteita kurssin muodossa

### [React Express](http://www.react.express/)
* All-in-one guide

### [React Fundamentals](https://reacttraining.com/online/react-fundamentals)
* Kattavasti asiaa kurssin muodossa

### [React Fundamentals](https://www.youtube.com/playlist?list=PLqrUy7kON1mc7U60YUaN3ZR9EHlh9fsDL)
* Edellisen linkin videot YouTube-soittolistana

# Tehtävä

1. Tee [Create React App](https://github.com/facebookincubator/create-react-app) -työkalulla uusi React-projekti
    * Nimi voi olla esimerkiksi "the-race-to-december-31"
1. Toteuta päivämäärävalintapeli

### Pelin säännöt
* Peli alkaa päivämäärästä *1.1.*
* Pelaaja ja tietokone valitsevat vuorotellen jonkin tulevan päivämäärän
  * Valitun päivämäärän on oltava suurempi joko päivä- tai kuukausiarvoltaan, ja toisen arvon on pysyttävä samana
    * Esimerkiksi *1.1.* jälkeen voi valita *17.1.* tai *1.3.*, mutta ei *22.10.*
    * Päiväarvo ei voi olla edellistä pienempi
      * *29.7.* jälkeen ei voi valita *22.8.*
* Voittaja on se, joka onnistuu valitsemaan päivämäärän *31.12.*
* Pelaaja aloittaa

### Pelin toteutus
1. Asenna [Airbnb React Datepicker](https://github.com/airbnb/react-dates) ja sen vaatimat muut riippuvuudet
    ```
    npm install --save-dev react-dates moment react-addons-shallow-compare
    ```
1. Käytä `<SingleDatePicker />`:iä
1. Aseta suomalainen päivämääräformaatti `displayFormat`-propilla
    * Formaatti käyttää [Moment-kirjaston päivämääräformaattia](https://momentjs.com/docs/#/displaying/format/)
1. Voit käyttää Datepickerin `isDayBlocked` -callback-funktiota päivämäärien rajaukseen
    * Funktio saa parametrina [Moment-kirjaston](https://momentjs.com/docs/) päivämääräobjektin
1. Tietokone valitsee päivämäärän oheisella funktiolla
    ```js
    import moment from 'moment';
    // getComputerMove :: (Moment a) -> Moment
    function getComputerMove(a) {
      const b = a.date();
      if (31 === b) return moment({ date: 31, month: 11 });
      const c = a.month(), d = c + 20;
      if (d < b) {
        const e = b - 20, f = moment({ date: b, month: e });
        return f.isValid() ? f : moment({ date: b, month: e + 1 });
      }
      return moment(d === b ? { date: b, month: c + 1 } : { date: d, month: c });
    }
    ```
1. Listaa jo valitut päivämäärät
1. Lisää "Uusi peli" -painike

[Lisätietoa pelistä (YouTube)](https://www.youtube.com/watch?v=ETb6MqCAo1Q)
