# Huomioita

### Kaikki tagit on suljettava

```jsx
<div>
  <Header />
  <hr />
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do...
</div>
```

### JSX-koodissa ei ole kommentteja

* Pitää “vaihtaa” JavaScriptin puolelle `{}`-merkeillä ja käyttää JavaScript-kommentteja

```jsx
<div>
  <h1>Uusi otsikko</h1>
  {/*<h1>Otsikko</h1>*/}
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do...
</div>
```

### Isoilla ja pienillä kirjaimilla on merkitystä

`onclick` ≠ `onClick`

### ~~`class`~~ sijasta käytetään `className` ja `for` sijasta `htmlFor`

* `class` ja `for` ovat JavaScriptissä varattuja sanoja

```jsx
<label htmlFor="exampleInput">Nimi</label>
<input
  type="text"
  className="form-control"
  id="exampleInput"
/>
```

### `style`-property ottaa vastaan stringin sijasta objektin

* `number`-tyypin arvot muutetaan `px`-yksikköön
* CSS-määritysten nimet ovat camelCase:lla

```jsx
<span style={{
    bottomMargin: '.4em',
    padding: 10 
}}>{nimi}</span>;
```

### Taulukoiden elementit on merkittävä yksilöllisellä key:llä

* `key`:n avulla React optimoi DOM-operaatioita, kun taulukon elementtien järjestys tai määrä muuttuu
* `key`:n on oltava yksilöllinen vain talukon sisällä
* `key`:n arvo muutetaan `string`-tyyppiseksi
* Arvona voi usein käyttää esimerkiksi tietokanta-ID:tä, jos se on saatavilla tai muuta uniikkia arvoa
  * Viimekädessä voi käyttää taulukon indeksiä

```jsx
<ul>
  {henkilöt.map(({ nimi, puhelinnumero, _id }, index) => (
    <li key={puhelinnumero}>{nimi}</li>
  ))}
</ul>;
```

