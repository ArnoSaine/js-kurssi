# JSX

## HTML:n kaltainen syntaksi {#exerslide-slide-title-5}

### JavaScriptiä, jossa:

* `<>`-merkkien sisälle JSX:ää, jossa:
  * `{}`-merkkien sisälle JavaScriptiä, jossa:
    * `<>`-merkkien sisälle JSX:ää, jne.

```jsx
<div>
  <div>Materiaali: {materiaali}</div>
  <button disabled onClick={this.handleClick}>Tallenna</button>
</div>
```

### JSX kääntyy `React.createElement`-funktiokutsuiksi

```javascript
React.createElement(
  "div",
  null,
  React.createElement(
    "div",
    null,
    "Materiaali: ",
    materiaali
  ),
  React.createElement(
    "button",
    { disabled: true, onClick: this.handleClick },
    "Tallenna"
  )
);
```

### **Isolla** kirjaimella alkavat elementit ovat _React-komponentteja_, **pienellä** kirjaimella alkavat elementit ovat _HTML-elementtejä_

* Komponentti palauttaa HTML-elementtejä tai toisia komponentteja, jotka lopulta palauttavat HTML-elementtejä
* Lista elementtejä voidaan palauttaa tyhjin tageihin \(`<>...</>`\) ympäröitynä
  * Myös taulukon palautus on mahdollista

```jsx
render() {
  return <>
    <h1>Tiedot</h1>
    <Puutavara tyyppi="lauta" materiaali="mänty" />
  </>;
}
```

