# Tehtävä

### Valmistelut

1. Tallenna [sovelluspohja](https://github.com/ArnoSaine/messageboard) ja suorita `npm install`
2. Käynnistä sovellus: `npm start`
3. Avaa tietokannan hallitapaneeli [http://localhost:5984/\_utils/](http://localhost:5984/_utils/)
4. Avaa sovellus \([http://localhost:3000](http://localhost:3000/)\) ja kokeile lisätä muutamia ilmoituksia

### Tehtävä

1. Lisää ilmoitukselle [poista-ruksi](https://react-bootstrap.github.io/components/alerts/#alerts-closeable)
   * Ruksia painettaessa tee tietokantaan `fetch`-pyyntö, joka [poistaa](http://docs.couchdb.org/en/latest/api/document/common.html#delete--db-docid) kyseisen ilmoituksen tietokannasta
2. Ilmoitusten järjestäminen
   1. Lisää käyttöliittymällä uudelle ilmoitukselle aikaleima \(esimerkiksi `Date.now()`\)
   2. Järjestä ilmoitukset aikaleiman mukaan, uusin ylimmäksi. Käytä järjestämisessä [Array.prototype.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):ia, tai [react-pouchdb](https://www.npmjs.com/package/react-pouchdb#find) ja [PouchDB](https://pouchdb.com/api.html#query_index):n rajapintoja.
3. Erityyppisten ilmoitusten tallennus
   1. Lisää lomakkeelle valinta, josta voi valita ilmoituksen tyypin \(`"success"`, `"warning"`, `"danger"`, `"info"`\)
   2. Käytä `<Alert />`-komponentin [`bsStyle`-propertyä](https://react-bootstrap.github.io/components/alerts/#alert-props) näyttämään erityypin ilmoitukset omilla väreillään

### Lisätehtäviä

* Estä tyhjän viestin lähetys
* Disabloi lomakkeen kentät ja “Lähetä”-painike, kun tallennus on kesken \(estetään vahinkolähetykset ja näytetään käyttäjälle, että toiminnon suoritus on kesken\)
* Toteuta ilmoitusten muokkaus
  * Ota käyttöön [React Router](https://reacttraining.com/react-router/)
  * Ilmoitusta klikattaessa navigoidaan osoitteeseen `/message/<id>` 
  * Käytä `<Route />`-komponenttia
    * Mikäli ollaan viestin osoitteessa \(eikä `/` tekemässä uutta viestiä\), renderöi lomake, johon haetaan [Get](https://www.npmjs.com/package/react-pouchdb#get):lla kyseisen viestin tiedot
  * Lomakkeen lähetys päivittää ilmoituksen tiedot

