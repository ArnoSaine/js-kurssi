# Komponentit voivat olla joko tilattomia tai tilallisia

### Tilattomat, s_tateless_-komponentit, ovat funktioita, joilla ei ole sivuvaikutuksia

* Kuvaavat ainoastaan `props`-parametrin perusteella, miltä käyttöliittymän tulisi missäkin tilanteessa näyttää
* Määritetään funktiona, jonka parametrina on`props`:it ja paluuarvona React-elementtejä

  ```jsx
  const Puutavara = ({ nimi, hinta, tarjous }) => (
    <h2 className={tarjous ? 'tarjous' : ''}>
      {nimi} <small>{hinta.toFixed(2)} €</small>
    </h2>
  );
  ```

### Tilalliset, _Stateful_-komponentit, ovat luokkia

* Komponenteilla on käytössään sisäinen `state`
* `state`:a päivitetään `this.setState(nextState)`-funktiokutsulla
  * React yhdistää `nextState`-objektin edelliseen `state`:en ja kutsuu `render`-metodia
  * `nextState` voi olla myös funktio, joka saa parametrina edellisen `state`:n, ja jonka tulee palauttaa `nextState`-objekti
* `props`:ien **lisäksi** _stateful_-komponentit käyttävät `state`:a määrittämään, miltä käyttöliittymän tulisi näyttää

```jsx
class Laskuri extends Component {
  state = {
    määrä: 0
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

