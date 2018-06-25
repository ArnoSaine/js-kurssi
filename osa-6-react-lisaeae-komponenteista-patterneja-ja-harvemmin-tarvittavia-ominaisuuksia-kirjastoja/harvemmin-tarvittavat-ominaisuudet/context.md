# Context

* Context-rajapinnan avulla komponentti voi välittää arvoja syvemmälle komponentti-hierarkiassa ilman, että tietoa täytyy manuaalisesti välittää `props`:eissa komponentilta toiselle
* Context on hyödyllinen ns. globaalien arvojen kanssa, mikäli sovelluksessa sellaisia on

```jsx
import { Component, createContext } from 'react';

const { Consumer, Provider } = createContext();

class App extends Component {
  state = {
    isLoggedIn: false
  }
  render() {
    return (
      <Provider value={this.state.isLoggedIn}>
        <Nav />
        <Pages />
      </Provider>
    );
  }
}

const Nav = () => (
  <>
    My App
    <Consumer>
      {isLoggedIn =>
        isLoggedIn ? <Link to="/logout">Logout</Link> : null}
    </Consumer>
  </>
);
```

[Context](https://reactjs.org/docs/context.html)

