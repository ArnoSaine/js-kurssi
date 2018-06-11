# Tehtäviä

### Tehtävä 1

1. Avaa jokin sivu jossa on mainoksia
   * Jos käytät Adblockia, poista se käytöstä
2. Avaa selaimen konsoli \(F12\)
3. Kirjoita konsoliin koodi joka poistaa sivulta mainoksia
   * Käytä selaimen DOM-metodeja. Vinkkejä:
     * Pitkä koodi on helpompi kirjoittaa tekstieditorissa ja kopioida konsoliin
     * Koska samaa koodia suoritetaan ilman sivulatauksia, törmää helposti viheeseen jossa jokin muuttuja on jo määritetty. Ongelman voi välttää laittamalla koodin välittömästi suoritettavan funktion sisälle \([IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)\)
       * `(function () { /* ... */ })();`
4. Lisää koodi selaimen kirjanmerkkeihin [bookmarklet:ina](https://fi.wikipedia.org/wiki/Sovelluskirjanmerkki). Vinkki:
   * Jos käytit IIFE:tä, riittää kun lisäät koodin alkuun `javascript:` ja tallennat sen kirjanmerkin URL:ksi

#### Lisätehtävä

1. Etsi sivu, jossa gobaali `jQuery`-muuttuja on saatavilla
2. Tee vastaavia muutoksia sivun sisältöön jQuerylla
3. Toteuta jQueryn kaltainen oma funktio, joka käyttää selaimen DOM-metodeja. Jos kohdassa 2 käytit esimerkiksi `jQuery(selector).remove();`, käytä vastaavasti omaa kirjastoa `munKirjasto(selector).remove();`

### Tehtävä 2

1. Avaa [Yle Areenasta](https://areena.yle.fi/) jonkin ohjelman sivu, esimerkiksi [Kummeli](https://areena.yle.fi/1-3339547)
2. Tutki selaimen Developer Tools → Network -välilehdeltä, mitä pyyntöjä sivu tekee
   * Ohjelman jaksojen tiedot saadaan tällaisella kyselyllä: `https://areena.yle.fi/api/programs/v1/items.json?series=1-3339547&type=program&availability=ondemand&order=episode.hash%3Aasc%2Cpublication.starttime%3Aasc%2Ctitle.fi%3Aasc&app_id=89868a18&app_key=54bb4ea4d92854a2a45e98f961f0d7da&limit=18`
     * Jossa ohjelman ID \(sama kuin osoiterivillä\) on polussa, query-parametreilla asetetaan muun muassa pyydettyjen tulosten enimmäismäärä
3. Suorita selaimen konsolissa fetch-pyyntö, joka lataa ohjelmatiedot
   * Sinun tulee olla samassa osoittessa \(`https://areena.yle.fi/`\), johon pyyntö tehdään
4. Selaimen DOM-operaatioita käyttäen
   1. Poista ensin sivulta kaikki sisältö
   2. Listaa haetut ohjelmatiedot
   3. Näytä listassa linkit, josta ohjelman katselu alkaa
5. Tee selaimeen kirjanmerkki, joka suorittaa kohdan 4 listauksen, mikäli käyttäjä on Yle Areenassa jonkin ohjelman sivulla
   * Vinkki: sivun URL:ään pääsee käsiksi globaalin `location`-muuttujan kautta

### Lisätehtäviä

* Tutustu seuraaviin artikkeleihin:
  * [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
  * [Learn ES2015](https://babeljs.io/learn-es2015/)



