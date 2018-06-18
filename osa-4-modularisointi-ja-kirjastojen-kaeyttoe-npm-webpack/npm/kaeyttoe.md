# Käyttö

### `npm init` – Uusi tyhjä projekti

* kysyy muutamia tietoja ja tekee nykyiseen kansioon `package.json`-tiedoston
* `-y`-optiolla komento tekee tiedoston oletusarvoilla

{% hint style="info" %}
`package.json`-tiedosto voidaan tehdä myös käsin

* `name`- ja `version`-kentät ovat pakollisia

  ```javascript
  {
    "name": "my-app",
    "version": "0.1.0"
  }
  ```
{% endhint %}

### `npm install` – Projektin nykyisten riippuvuuksien asennus

* Ilman parametreja komento asentaa `package.json`:iin listatut `dependencies`- ja `devDependencies`-riippuvuudet `node_modules`-kansioon

{% hint style="warning" %}
* Komento ei päivitä riippuvuutta, jos se on jo asennettu
* Suorita `npm update`, jos `package.json`-tiedoston riippuvuuksia on muutettu toisen kehittäjän toimesta
  * Komento asentaa puuttuvat riippuvuudet ja päivittää paketit oikeisiin versioihin, jos versioita on muutettu
{% endhint %}

### `npm install --save-dev some-package` – Uuden riippuvuuden asennus

* Asentaa komentoon listatut paketit `node_modules`-kansioon
* `--save-dev`-optio lisää arvon `package.json`:in `devDependencies`-listaan. Ilman optiota, paketti listataan `package.json`:in `dependencies`-listaan

{% hint style="info" %}
Riippuvuudet listataan `package.json`:iin, jotta ne asentuvat muillekin kehittäjille
{% endhint %}

### `dependencies` vai `devDependencies`?

* Normaalitilanteessa käytetään `devDependencies`:iä
* `dependencies`:iä käytetään jos
  * Paketti halutaan asentaa tuotantoon tai jonkin toisen paketin riippuvuudeksi npm:llä
  * ja paketti käyttää asennuksen jälkeen kyseisiä paketteja

{% hint style="info" %}
Jos epäilet asennuksen olevan sekaisin, `node_modules`-kansion voi poistaa ja `npm install`-komennon voi suorittaa uudelleen
{% endhint %}



