# Ajax:lla “tehostetut” perinteiset sovellukset \(2/2\)

### Mikä meni pieleen?

1. Ajatus siitä, että tietoa **haetaan** palvelimelta
   * Haetaanko tarvittava tieto?
   * Haetaanko liikaa tai liian usein tietoa kun se ei olekaan muuttunut?
   * Virhealtista koodia
   * Paljon “ylimääräistä” koodattavaa varsinaisen toiminnallisuuden lisäksi
2. DOM:ia **muokataan suoraan** esimerkiksi jQueryllä
   * Tieto on hankalaa päivittää ruudulle, jos muutos voi vaikuttaa moneen kohtaan
   * Logiikka, miten tieto asetetaan ruudulle, on tehtävä kahdella eri tekniikalla \(palvelin ja selain\)

### Parempi tapa

* Palvelin **lähettää** tiedot muutoksista siitä kiinnostuneille selaimelle \(ja toisille palvelimille\)
  * [SockJS](https://github.com/sockjs/sockjs-client):llä tai [Socket.IO](https://socket.io/):lla viestit selaimeen
  * Tietokannaksi sellainen, joka tukee tehokkaasti muutosten kuuntelua
    * \(Avainsanoja sopivan tietokannan etsintään: _changes_, _feed_, _real-time_, _triggers_, _reactive_\)
* DOM:n muokkaus kirjaston avulla
  * Näkymän päivitykseen riittää, että dataa muutetaan

