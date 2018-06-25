# Komponentin metodit ja this-arvo

* Callback-funktion käyttäjä saa viittauksen vain funktioon
* this-arvo pitää kiinnittää funktioon, mikäli this-arvoa käytetään

**→** Callback-metodit täytyy toteuttaa nuolifunktiona

```jsx
class App extends Component {
  state = {};
  handleChange = event => {
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
        /*
        onChange={
          // Callback voidaan määrittää suoraan anonyyminä nuolifunktiona.
          event => this.setState({ value: event.target.value })
        }
        */
        onChange={
          // Välitetään viittaus funktioon joka on määritetty muualla.
          // Suorituskykyisin tapa, koska uutta funktiota ei tehdä joka render-
          // kutsulla uudelleen.
          this.handleChange
        }
        value={this.state.value}
      />
    );
  }
}
```

