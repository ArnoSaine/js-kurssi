# Refs

* Viittauksilla \([refs](https://reactjs.org/docs/refs-and-the-dom.html)\) pääsee käsiksi alemman komponentin instanssiin tai DOM-elementtiin
* `ref`-propertyyn annetaan `React.createRef`:lla luotu objekti
* Kun _child_ on liitetty DOM:iin, `ref.current` -arvosta voidaan lukea viittaus
* Viittaus on komponentin instanssiin, tai DOM-elementtien tapauksessa suoraan DOM-elementtiin

```jsx
import { Component, createRef } from 'react';

class Hinnasto extends Component {
  tulosta() {
    // ...
  }
  render() {
    // ...
  }
}

class Kauppa extends Component {
  constructor(props) {
    super(props);
    this.hinnasto = createRef();
    this.textInput = createRef();
  }
  tulostaHinnasto = () => {
    this.hinnasto.current.tulosta();
  };
  focusTextInput = () => {
    this.textInput.current.focus();
  };
  render() {
    return (
      <>
        <Hinnasto ref={this.hinnasto} />
        <button onClick={this.tulostaHinnasto}>Tulosta hinnasto</button>
        <input
          ref={this.textInput}
          type="text"
        />
      </>
    );
  }
}
```

