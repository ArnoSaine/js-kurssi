# Ajax:lla “tehostetut” perinteiset sovellukset \(1/2\)

1. Palvelimella muodostetaan HTML-dokumentti kuten ennenkin ja/tai tietoa **haetaan** erikseen Ajax-pyynnöillä
2. Tietoa muutetaan ruudulla
3. Tieto tallennetaan tietokantaan Ajax-pyynnöllä
4. Tiedonvälitys muille käyttäjille nähdään eri ominaisuutena

### Ratkaisuyrityksiä tai selityksiä

* “Tuleehan tieto käyttäjille silloinkin kun sivu päivitetään”
* Pollataan palvelinta – haetaan tärkeimmät tiedot _x_ sekunnin välein
* “Tarvitaan socket-yhteys”
* Jos jotain isoa muuttuu, ladataan koko sivu uudelleen

