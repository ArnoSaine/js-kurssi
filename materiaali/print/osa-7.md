# Osa 7 – Sisältö

* Vuorovaikutteisten web-sovellusten historiaa
* Reaaliaikasovellus Reactilla ja CouchDB:llä
* Tehtävä

##### Arno Saine – [arno@mowhi.com](mailto:arno@mowhi.com) – 2017

# Vuorovaikutteisten web-sovellusten historiaa
## Ennen Ajaxia

### Palvelin laati oikeanlaisen sivun perustuen pyynnön parametreihin, istunnon muuttujiin ja tietokannan dataan
```php
<table>
<?php
foreach ($arr as $row) {
  echo '<tr>' .
    '<td>' . $row["name"] . '</td>' .
    '<td>@' . $row["phonenumber"] . '</td>' .
  '</tr>';
}
?>
</table>
```

### Kaikki vuorovaikutteisuus palvelimen kautta
* Ohjelmointi oli helppoa :thumbsup:
  * Sovelluksen tila oli yhdessä paikassa, palvelimella
* Palvelin kuormittuu :thumbsdown:
* Välimuisti vähentää kuormaa – toi mukanaan tietoturvaongelmia :thumbsdown:

# Ajax

### DOM:n muokkaus ja kommunikointi palvelimen kanssa ilman sivulatauksia

* Kiva pieni lisäys? Ei aivan...

# Ajax:lla "tehostetut" perinteiset sovellukset (1/2)

1. Palvelimella muodostetaan HTML-dokumentti kuten ennenkin ja/tai tietoa **haetaan** erikseen Ajax-pyynnöillä
1. Tietoa muutetaan ruudulla
1. Tieto tallennetaan tietokantaan Ajax-pyynnöllä
1. Tiedonvälitys muille käyttäjille nähdään eri ominaisuutena

### Ratkaisuyrityksiä tai selityksiä
* "Tuleehan tieto käyttäjille silloinkin kun sivu päivitetään"
* Pollataan palvelinta – haetaan tärkeimmät tiedot *x* sekunnin välein
* "Tarvitaan socket-yhteys"
* Jos jotain isoa muuttuu, ladataan koko sivu uudelleen

# Ajax:lla "tehostetut" perinteiset sovellukset (2/2)

### Mikä meni pieleen?
1. Ajatus siitä, että tietoa **haetaan** palvelimelta
    * Haetaanko tarvittava tieto?
    * Haetaanko liikaa tai liian usein tietoa kun se ei olekaan muuttunut?
    * Virhealtista koodia
    * Paljon "ylimääräistä" koodattavaa varsinaisen toiminnallisuuden lisäksi
1. DOM:ia **muokataan suoraan** esimerkiksi jQueryllä
    * Tieto on hankalaa päivittää ruudulle, jos muutos voi vaikuttaa moneen kohtaan
    * Logiikka, miten tieto asetetaan ruudulle, on tehtävä kahdella eri tekniikalla (palvelin ja selain)

### Parempi tapa
* Palvelin **lähettää** tiedot muutoksista siitä kiinnostuneille selaimelle (ja toisille palvelimille)
  * [SockJS](https://github.com/sockjs/sockjs-client):llä tai [Socket.IO](https://socket.io/):lla viestit selaimeen
  * Tietokannaksi sellainen, joka tukee tehokkaasti muutosten kuuntelua
    * (Avainsanoja sopivan tietokannan etsintään: *changes*, *feed*, *real-time*, *reactive*)
* DOM:n muokkaus kirjaston avulla
  * Näkymän päivitykseen riittää että dataa muutetaan

# CouchDB

### Data tallennetaan JSON-dokumentteina
```json
{
  "_id": "407804",
  "_rev": "1-5f14bab1a1e9ac3ebdf85905f47fb084",
  "year": 2000,
  "title": "Where the Heart Is"
}
```

### Datan etsintä [JSON-query syntaksin](http://docs.couchdb.org/en/latest/api/database/find.html) avulla ja tietokantaan tallennetuista [näkymistä](http://docs.couchdb.org/en/latest/api/ddoc/views.html)
```json
{
  "selector": {
    "year": {"$gt": 2010}
  },
  "fields": ["_id", "_rev", "year", "title"],
  "sort": [{"year": "asc"}],
  "limit": 2,
  "skip": 0
}
```

```js
function(doc) {
  if (doc.date && doc.title) {
    emit(doc.date, doc.title);
  }
}
```

### Jokainen muutos versioidaan
* Hajautetun sovelluksen (kuten mikä tahansa *single-page application*) teko on helpompaa

### Dokumenttien muutoksia voidaan kuunnella

[CouchDB – The Definitive Guide](http://guide.couchdb.org/editions/1/en/index.html)

# Reaaliaikasovellus Reactilla ja CouchDB:llä
## Esimerkkitapaus

* Tietokannaksi valittiin JSON-dokumenttitietokanta, [CouchDB](http://couchdb.apache.org/)
* Käyttöliittymä toteutettiin Reactilla
* Jos React-komponentin tarvitsemaa tietoa ei ollut selaimella, `componentWillMount`-metodissa haettiin tieto tietokannasta ja ryhdyttiin kuuntelemaan muutoksia
* `componentWillUnmount`-metodissa kuuntelu lopetettiin, mikäli kyseessä oli viimeinen datasta kiinnostunut instanssi

```js
<tr>
  <td>...</td>
  <td>
    <button onClick={() =>
      fetch(`/arkistoyksikot/${_id}?rev=${_rev}`, {
        credentials: 'same-origin',
        method: 'DELETE'
      })
    }>Poista</button>
  </td>
</tr>
```

#### "Poista"-painikkeen klikkaus
* Rivi poistuu käyttäjältä itseltään, toisilta välilehdiltä ja muilta käyttäjiltä :thumbsup:
* Myös kaikki sivuvaikutukset päivittyvät käyttäjille :thumbsup:

# Esimerkkitapaus – yhteenveto

### Kehitys eteni paikoin hitaasti
* Dokumenttien välillä on riippuvuuksia
* Muutosten vyörytys toisiin dokumentteihin on työlästä

### Kehitys eteni paikoin nopeasti
* Dokumenttien kenttien lisäys ja muokkaus on helppoa
* Tietojen muokkaus-, lisäys-, näyttötoimintojen teko on helppoa
  * Varsinaisen toiminnon lisäksi ei ollut muuta koodattavaa ("Poista"-painikkeen esimerkki)
* Reaaliaikaisuus ja CouchDB:n versionhallinta – ei koodattavaa liittyen vanhentuneen tiedon tarkasteluun

### Sovelluslogiikka on käyttöliittymällä
* Palvelimella (Node.js) on lähinnä dokumenttien riippuvuuksien hallinta ja raporttien generointi
* [CouchDB HTTP API](http://docs.couchdb.org/en/latest/api/index.html) :thumbsup:
### Sovellus on ollut varmatoiminen ja siinä on ollut vähän bugeja

# Yksinkertainen mutta tehokas arkkitehtuuri

<img src="https://cdn.rawgit.com/ArnoSaine/js-kurssi/master/materiaali/drawing-1.svg">

### SockJS / Socket.IO
* Data-liikenne *palvelin* → *selain*
### React
* Data ruudulle
### Fetch API / SockJS / Socket.IO
* Data-liikenne *selain* → *palvelin*
* Fetch API:n asynkronisuus ja virhekoodit :thumbsup:
### Tietokanta
* CouchDB / PouchDB / RethinkDB tms. joka tukee muutosten kuuntelua
### Palvelin
* Node.js

# Tehtävä
## Valmistelut

1. Tee [Create React App](https://github.com/facebookincubator/create-react-app) -työkalulla uusi React-projekti
1. Asenna oheiset riippuvuudet
    ```
    npm install --save concurrently koa koa-proxy koa-socket koa-static pouchdb pouchdb-server
    npm install --save-dev bootstrap react-bootstrap socket.io-client
    ```
1. Aseta `main`- ja `proxy`-arvot, ja lisää skriptit `package.json`:iin
    ```json
    {
      "scripts": {
        "start:db": "pouchdb-server --dir pouchdb",
        "start:server": "node .",
        "start:prod": " concurrently \"npm run start:db\" \"npm run start:server\""
      },
      "main": "server",
      "proxy": {
        "/*": {
          "target": "http://localhost:8080/"
        },
        "/socket.io/*": {
          "target": "http://localhost:8080/",
          "ws": true
        }
      }
    }
    ```

1. Lisää seuraavat tiedostot

    `server.js`:
    ```js
    const Koa = require('koa');
    const proxy = require('koa-proxy');
    const serve = require('koa-static');
    const PouchDB = require('pouchdb');
    const IO = require('koa-socket');

    const app = new Koa();
    const io = new IO();
    const dbHost = 'http://localhost:5984';
    const port = 8080;

    io.attach(app);
    // Selainsovelluksen jakaminen tuotantoversiossa build-kansiosta.
    app.use(serve('build'));
    // Pyyntöjen välitys tietokantaan.
    app.use(proxy({ host: dbHost }));

    app.listen(port);
    console.log(`listening on port ${port}`);

    app._io.on('connection', function(socket) {
      // Mapiin tallennetaan aloitetut tietokantojen kuuntelut, jotta
      // kuuntelut voidaan lopettaa kun client sulkee yhteyden (sivulta
      // poistutaan tms.).
      const changeListeners = new Map();
      // Aloita muutospyyntöjen kuuntelu. Parametrina tulee antaa
      // tietokannan nimi, jonka muutoksista halutaan tieto.
      socket.on('addListener', function(dbName) {
        if (!changeListeners.has(dbName)) {
          const db = new PouchDB(`${dbHost}${dbName}`);
          changeListeners.set(
            dbName,
            db
              .changes({ live: true, include_docs: true, since: 'now' })
              .on('change', function(change) {
                socket.emit('change', change.doc);
              })
          );
        }
      });
      socket.on('removeListener', function(dbName) {
        if (changeListeners.has(dbName)) {
          changeListeners.get(dbName).cancel();
          changeListeners.delete();
        }
      });
      socket.on('disconnect', function() {
        changeListeners.forEach(function(changes) {
          changes.cancel();
        });
        changeListeners.clear();
      });
    });
    ```

    `src/App.js`:
    ```js
    import React, { Component } from 'react';
    import io from 'socket.io-client';
    import 'bootstrap/dist/css/bootstrap.css';
    import {
      Button,
      Col,
      ControlLabel,
      FormControl,
      FormGroup,
      Grid,
      Row
    } from 'react-bootstrap';
    import Ilmoitus from './Ilmoitus';

    const socket = io();

    class App extends Component {
      state = {
        ilmoitukset: [],
        teksti: ''
      };
      componentWillMount() {
        socket.on('change', doc => {
          if (doc._deleted) {
            // Dokumentti on poistettu.
            this.setState({
              ilmoitukset: this.state.ilmoitukset.filter(
                ({ _id }) => doc._id !== _id
              )
            });
          } else {
            const index = this.state.ilmoitukset.findIndex(
              ({ _id }) => _id === doc._id
            );
            if (index === -1) {
              // Uusi dokumentti.
              this.state.ilmoitukset.push(doc);
            } else {
              // Dokumenttia muokattiin.
              this.state.ilmoitukset[index] = doc;
            }
            this.setState(this.state);
          }
        });
        socket.emit('addListener', 'ilmoitustaulu');
      }
      componentWillUnmount() {
        socket.emit('removeListener', 'ilmoitustaulu');
      }
      onSubmit = async event => {
        event.preventDefault();
        // const teksti = this.state.teksti
        const { teksti } = this.state;
        // http://docs.couchdb.org/en/latest/api/database/common.html#post--db
        await fetch('/ilmoitustaulu', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ teksti })
        });
        // Tyhjennetään tallennettu arvo tekstikentästä.
        this.setState({ teksti: '' });
      };
      render() {
        return (
          <Grid fluid>
            <h1>Ilmoitustaulu</h1>
            <Row>
              <Col xs={12} sm={7} md={8} lg={9}>
                {this.state.ilmoitukset.map(Ilmoitus)}
              </Col>
              <Col xs={12} sm={5} md={4} lg={3}>
                <form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <ControlLabel>Viesti</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Viesti"
                      value={this.state.teksti}
                      onChange={event =>
                        this.setState({ teksti: event.target.value })}
                    />
                  </FormGroup>
                  <Button bsStyle="primary" type="submit" block>Lähetä</Button>
                </form>
              </Col>
            </Row>
          </Grid>
        );
      }
    }

    export default App;
    ```

    `src/Ilmoitus.js`:
    ```js
    import React from 'react';
    import { Alert } from 'react-bootstrap';

    const Ilmoitus = ({ _id, teksti }) => (
      <Alert key={_id}>
        {teksti}
      </Alert>
    );

    export default Ilmoitus;
    ```

1. Käynnistä tietokanta ja palvelin
    ```
    npm run start:prod
    ```

1. Toisessa terminaalissa käynnistä käyttöliittymän kehitys
    ```
    npm start
    ```

1. Avaa tietokannan hallitapaneeli [http://localhost:5984/_utils/](http://localhost:5984/_utils/)
1. Lisää tietokanta *"ilmoitustaulu"* (tietokannan nimeä käytetään myöhemmin API-kutsuissa)
1. Avaa sovellus ([http://localhost:3000](http://localhost:3000)) ja kokeile lisätä muutamia ilmoituksia

# Tehtävä

1. `componentWillMount`-metodissa hae nykyiset ilmoitukset [tietokannasta](http://docs.couchdb.org/en/latest/api/database/bulk-api.html#db-all-docs)
    * (Palvelin ohjaa pyynnöt tietokannalle, joten osoite on muotoa `/jotain?abc=123`)
    * Sisällytä dokumentit vastaukseen `include_docs`-parametrilla
    * Aseta dokumentit `state`:en, jotta ne näkyvät ruudulla
    ```js
    async componentWillMount() {
      const response = await fetch(/*...*/);
      const data = await response.json();
      //const ilmoitukset = ...;
      //this.setState({ ilmoitukset });

      //socket.on('change', doc => {...
    ```
1. Lisää ilmoitukselle [poista-ruksi](https://react-bootstrap.github.io/components.html#alerts-closeable)
    * Ruksia painettaessa tehdään `fetch`-pyyntö tietokantaan, jolla [poistetaan](http://docs.couchdb.org/en/latest/api/document/common.html#delete--db-docid) kyseinen ilmoitus tietokannasta
1. Ilmoitusten järjestäminen
    1. Lisää uudelle ilmoitukselle aikaleima (esimerkiksi `Date.now()`)
    1. [Järjestä](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) ilmoitukset render-metodissa aikaleiman mukaan, uusin ylimmäksi
1. Erityyppisten ilmoitusten tallennus
    1. Lisää lomakkeelle valinta, josta voi valita ilmoituksen tyypin (`"success"`, `"warning"`, `"danger"`, `"info"`)
    1. Käytä `<Alert />`-komponentin [`bsStyle`-propertyä](https://react-bootstrap.github.io/components.html#alert-props) näyttämään erityypin ilmoitukset omilla väreillään

### Lisätehtäviä
* Estä tyhjän viestin lähetys
* Disabloi lomakkeen kentät ja "Lähetä"-painike, kun tallennus on kesken
  * (estetään vahinkolähetykset ja näytetään käyttäjälle, että toiminnon suoritus on kesken)
* Toteuta ilmoitusten muokkaus
  * Ilmoitusta klikattaessa tiedot avataan lomakkeelle ja tallennus päivittää ilmoituksen tiedot
