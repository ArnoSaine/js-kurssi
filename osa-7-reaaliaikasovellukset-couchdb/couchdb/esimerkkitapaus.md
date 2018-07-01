# Esimerkkitapaus

* Tietokannaksi valittiin JSON-dokumenttitietokanta, [CouchDB](http://couchdb.apache.org/)
* Käyttöliittymä toteutettiin Reactilla
* Jos React-komponentin tarvitsemaa tietoa ei ollut selaimella, `componentDidMount`-metodissa haettiin tieto tietokannasta ja ryhdyttiin kuuntelemaan muutoksia
* `componentWillUnmount`-metodissa kuuntelu lopetettiin, mikäli kyseessä oli viimeinen datasta kiinnostunut instanssi

### Esimerkki _p**oista**_-painikkeen toteutuksesta

```jsx
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

{% hint style="success" %}
#### “Poista”-painikkeen klikkaus

* Rivi poistuu lähes välittömästi käyttäjältä itseltään, toisilta välilehdiltä ja muilta käyttäjiltä 👍
* Myös kaikki sivuvaikutukset päivittyvät käyttäjille 👍
{% endhint %}

