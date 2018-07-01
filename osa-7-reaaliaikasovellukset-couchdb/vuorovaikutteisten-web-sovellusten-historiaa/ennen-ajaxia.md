# Ennen Ajaxia

### Palvelin laati oikeanlaisen sivun perustuen pyynnön parametreihin, istunnon muuttujiin ja tietokannan dataan

```php
<table>
<?php
foreach ($arr as $row) {
  echo '<tr>' .
    '<td>' . $row["name"] . '</td>' .
    '<td>@' . $row["phonenumber"] . '</td>' .
  '</tr>';
}
?>
</table>
```

### Kaikki vuorovaikutteisuus palvelimen kautta

* Ohjelmointi oli helppoa 👍
  * Sovelluksen tila oli yhdessä paikassa, palvelimella
* Palvelin kuormittuu 👎
* Välimuisti vähentää kuormaa – toi mukanaan tietoturvaongelmia 👎

