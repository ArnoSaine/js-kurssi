# Render props

* Render props, tarkoittaa sellaista `props`:ia, joka on tyypiltään funktio ja joka palauttaa React-elementin tai elementtejä
* Render propsin vastaanottava komponentti kutsuu tätä funktiota omassa render-metodissa, mahdollisesti parametrein
* Render props on yksi tavoista, jolla **ulompi** \(ylempi\) komponentti voi **määrittää**, miltä **sisempi** \(alempi\) komponentti **näyttää**

```jsx
class Fetch extends Component {
  state = {};
  async componentDidMount() {
    const { url, options } = this.props;
    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ data });
  }
  render() {
    const { data }  = this.state;
    return data
      // Jos data on saatavilla, Fetch-komponentti renderöi this.props.render(data) -
      // funktiokutsun tuloksen.
      ? this.props.render(data)
      // Fetch-komponentti ei renderöi mitään, jos dataa ei ole.
      : null;
  }
}

// UserInfo (ulompi) käyttää Fetch-komponenttia (sisempi)
const UserInfo = ({ userId }) => (
  <Fetch
    url={`/api/user/${userId}`}
    render={({ age, name }) => (
      <>
        <span className="username">{username}</span>
        <span className="age">{age}</span>
      </>
    )}
  />
);
```

[Render Props](https://reactjs.org/docs/render-props.html)

