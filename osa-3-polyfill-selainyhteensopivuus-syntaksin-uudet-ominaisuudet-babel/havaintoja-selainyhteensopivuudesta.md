# Havaintoja selainyhteensopivuudesta

* IE noudattaa joitain HTML-määrityksiä, eri tavalla kuin muut selaimet
  * Angular-projektin custom-attribuuttien nimissä ei pidä käyttää HTML:ssä varattuja sanoja, kuten `disabled` tai `for`

```markup
<!-- Toimii IE:ssä epätoivotusti. Kaikki `my-component`:n sisällä olevat
inputit ym. ovat disabloitu, riippumatta funktiokutsun tuloksesta: -->
<my-component disabled="{{$ctrl.isDisabled()}}" />

<!-- OK myös IE:ssä. `MyComponent` saa disabled-attribuutin ja voi käyttää
sitä haluamallaan tavalla: -->
<my-component data-disabled="{{$ctrl.isDisabled()}}" />
```

* IE 11 ja vanhemmat eivät tue [CSS-initial](https://developer.mozilla.org/en-US/docs/Web/CSS/initial) -arvoa. Oletusarvo täytyy määrittää tarkasti haluttuun arvoon:

```css
/* Vaihdetaan taulukot nykytyyliin ottamaan parentin enimmäisleveys.
(Normaalisti taulukon kokonaisleveys venyisi taulukon sisällön mukaan) */
table {
  width: 100%;
}

/* Myöhemmin halutaankin lisäksi `<table class="my-data-table">`, joka ei
ota 100% leveyttä vaan toimii selaimen oletusarvon mukaan. */
table.my-data-table {
  /* width: initial; Ei toimi IE 11 ja vanhemmissa */
  width: auto; /* Haluttu arvo pitää määrittää tarkasti. Oletusarvo
    `width`:n tapauksessa on `auto`. Toimii IE:ssä ja muissa. */
}
```

* Sovellusta voi pääosin kehittää valitsemallaan selaimella, mutta toiminnot on syytä testata erikseen myös IE:llä
* Suorituskyky, erityisesti raskaiden operaatioiden ns. _worst-case scenario_, on syytä testata aina IE:llä

