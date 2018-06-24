# Data liikkuu yhteen suuntaan

* `props`:eja, `state`:a sekä muita arvoja välitetään **alaspäin** \(syvemmälle\) toisille komponenteille, joista oma komponentti koostuu
* Ylöspäin tietoa välitetään `callback`-funktioiden avulla, mikäli sellaisia on saatu itselle `props`:ssa

```jsx
render() {
  return <div>
    <Puutavara nimi={this.props.nimi} hinta={this.props.hinta} />
    <button onClick={this.vähennä}>-</button>
    <button onClick={this.lisää}>+</button>
    <button onClick={() => this.props.lisääOstoskoriin(this.state.määrä)}>
      Osta {this.state.määrä}
    </button>
  </div>;
}
```

* Sovelluksessa voi olla useita _stateful_-komponentteja
* Jos komponentit eri puolilla sovellusta ovat riippuvaisia jostakin yhteisestä tiedosta \(`state`\), `state` pidetään niin ylhäällä, että halutut tiedot voidaan välittää alaspäin `props`:ina molemmille komponenteille
  * Alemmat komponentit voivat olla _stateless_-komponentteja
  * Alemmat komponentit käyttävät saamiaan `props`:eja
    * `props`:eja ei pidä kopioida komponentissa `state`:en
  * Kun ylemmässä komponentissa `state` muuttuu, alemmat komponentit päivittyvät automaattisesti

