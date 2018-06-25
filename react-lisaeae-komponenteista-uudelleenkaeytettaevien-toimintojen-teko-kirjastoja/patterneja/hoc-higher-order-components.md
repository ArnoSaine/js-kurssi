# HOC – Higher-Order Components

* HOC-funktiolla voidaan lisätä komponentteihin ominaisuuksia, esimerkiksi:
  * Dataa palvelimelta tarjotaan suoraan `props`:ina
  * `context`-arvo luetaan `props`:ksi

{% code-tabs %}
{% code-tabs-item title="./src/components/withUser.js" %}
```jsx
export default WrappedComponent =>
  class WithUser extends Component {
    state = {};
    async componentDidMount() {
      const response = await fetch('/api/user');
      const user = await response.json();
      this.setState({ user });
    }
    render() {
      return this.state.user
        ? <WrappedComponent {...this.props} {...this.state} />
        : 'Ladataan käyttäjätietoja...';
    }
  };
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="./src/components/App.js" %}
```jsx
import withUser from './withUser';

export default withUser(
  class App extends Component {
    render() {
      return <div>{this.props.user.name}</div>;
    }
  }
);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

[HOC](https://reactjs.org/docs/higher-order-components.html)

