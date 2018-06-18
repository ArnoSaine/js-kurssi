# Webpack

* Module Bundler
* Node.js -ohjelma
* Paketoi modulaarisen koodin yhteen tai useampaan tiedostoon \(bundleen\) selaimella käytettäväksi
* Käyttää ES2015-moduulisyntaksia
  * Oma sovelluskoodi ei ole Webpack-riippuvaista
* Minifioi tuotantokoodin
* Tekee sourcemap-tiedostot, jotta selaintyökaluissa näkyy todelliset lähdekooditiedostot
* Tekee tarvittaessa Sass- ym. CSS-muunnokset ja paljon muuta
* Paketointi on järkevää, koska kymmenien tai satojen pienten tiedostojen lataus yksitellen HTTP/1.1:llä on suorituskyvyn kannalta huono tapa
* Vain käytössä olevat \(“importatut”\) koodit tulevat mukaan bundleihin

