# Kirjastot ja modularisointi

* Tietoturvasyistä koodit halutaan jakaa omalta palvelimelta
* Kirjastoja ei säilytetä projektin versionhallinnassa
  * Asennetaan kehittäjän koneelle npm:stä
* Sovellus paketoidaan yhdeksi tai useammaksi minifioiduksi tiedostoksi julkaisua varten

### Etuja

* Ei pitkää listaa vaikeasti ylläpidettäviä `<script>`-tageja
  * Jos HTML-sivuja oli useita, uusi JavaScript-tiedosto piti muistaa lisätä jokaiseen jossa sitä saatettiin tarvita
  * `<script>`-tagien järjestys saattoi vaihdella, koodit olivat riippuvaisia toisistaan
    * Sovelluksen käynnistysvaiheen toimintojen teko oli hankalaa
  * Listassa saattoi olla ylimääräisiä koodeja, koska kukaan ei tiennyt mitä tarvitaan

