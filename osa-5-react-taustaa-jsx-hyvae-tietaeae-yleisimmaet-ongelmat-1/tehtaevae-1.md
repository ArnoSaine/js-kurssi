# Tehtävä

1. Tee [Create React App](https://create-react-app.dev/) -työkalulla uusi React-projekti
   * Nimi voi olla esimerkiksi “the-race-to-december-31”

### Pelin säännöt

* Peli alkaa päivämäärästä _1.1._ \(kuluvaa vuotta\)
* Pelaaja ja tietokone valitsevat vuorotellen jonkin tulevan päivämäärän
  * Valitun päivämäärän on oltava suurempi joko päivä- tai kuukausiarvoltaan. Toisen arvon on pysyttävä samana.
    * Esimerkiksi _1.1._ jälkeen voi valita _17.1._ tai _1.3._, mutta ei _22.10._
    * Edellistä pienempää  päivämääräarvoa ei voi valita
      * _29.7._ jälkeen ei voi valita _22.8._
* Voittaja on se, joka onnistuu valitsemaan päivämäärän _31.12._
* Pelaaja aloittaa

{% hint style="info" %}
[Lisätietoa pelistä \(YouTube\)](https://www.youtube.com/watch?v=ETb6MqCAo1Q)
{% endhint %}

### Toteutus

1. Asenna [MUI Date Picker](https://mui.com/x/react-date-pickers/date-picker/) ja sen vaatimat riippuvuudet

   ```bash
   npm install @mui/material @mui/x-date-pickers @emotion/react @emotion/styled moment
   ```

2. Käytä päivämäärän valintaan [`<StaticDatePicker />`](https://mui.com/x/react-date-pickers/date-picker/#static-mode):iä
   * Esimerkistä poiketen käytä `LocalizationProvider`:ssa Moment-kirjaston adapteria: `import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";`
4. Käytä `StaticDatePicker`:in `shouldDisableDate` -propille annettavaa callback-funktiota päivämäärien rajaukseen
   * Funktio saa parametrina [Moment-kirjaston](https://momentjs.com/docs/) päivämääräobjektin
5. Tietokone valitsee päivämäärän oheisella funktiolla:

   {% code-tabs %}
   {% code-tabs-item title="src/getComputerMove.js" %}
   ```javascript
   import moment from 'moment';
   // getComputerMove = (a: Moment) => Moment
   export default function getComputerMove(a) {
     const b = a.date();
     if (31 === b) return moment({ date: 31, month: 11 });
     const c = a.month(),
       d = c + 20;
     if (d < b) {
       const e = b - 20,
       f = moment({ date: b, month: e });
       return f.isValid() ? f : moment({ date: b, month: e + 1 });
     }
     return moment(d === b ? { date: b, month: c + 1 } : { date: d, month: c });
   }
   ```
   {% endcode-tabs-item %}
   {% endcode-tabs %}

5. Listaa valitut päivämäärät
6. Lisää “Uusi peli” -painike
7. Aseta suomalainen päivämääräformaatti

