# Tehtävä

1. Käynnistä Babel käännös watch-moodissa \(komento jää auki terminaaliin\)

   `npm run dev`

2. Käynnistä palvelin \(toisessa terminaalissa\)

   `npm start`

3. Muokkaa `src/index.js`-tiedostoa
   1. Hae palvelimelta `fetch`:llä `/api/top-packages.json`-tiedosto
   2. Toteuta sivulle “Top Trumps” -peli \(säännöt alapuolella\)

   * Toteutuksessa muokkaa `App`-luokan `render`-metodia, sekä toteuta `increase` ja `decrease` -metodien tilalle pelin tarvitsemat toiminnot
   * Toistuvaa koodia voit erottaa `button` ja `h1` kaltaisiin apufunktioihin, jotka palauttavat HTML:ää

### Pelin säännöt

* Kortit \(`/api/top-packages.json`-tiedostossa oleva taulukko\) sekoitetaan ja jaetaan 2 pakkaan
* Pelaajalle näytetään oman pakan ylin kortti
* Pelaajan tehtävä on veikata kortista tietoa, joka on parempi kuin vastapelaajan \(tietokoneen\) kortissa
  * Suurempi arvo on parempi näissä kentissä
    * `dependents`
    * `downloadsLastMonth`
    * `maintenance`
    * `popularity`
    * `quality`
    * `releases`
  * Pienempi arvo on parempi näissä kentissä
    * `dependencies`
    * `openIssues`
    * `openPullRequests`
* Kun pelaaja on klikkaa valitsemaansa tietoa
  * Jos arvot ovat yhtäsuuret
    * Näytetään ilmoitus
    * Pelaaja veikkaa uudelleen
  * Jos arvot ovat erisuuret
    * Ohjelma näyttää molemmat kortit, kumpi pelaaja voitti kierroksen ja “Jatka”- / “Aloita alusta”-painikkeen
* Kun pelaaja klikkaa “Jatka”-painiketta, molemmat kortit menevät voittaneen pelaajan pakan pohjalle
* Jos molemmilla pelaajilla on kortteja jäljellä, pelataan uusi kierros
* Peli päättyy kun toiselta pelaajalta loppuvat kortit

