# Events

### Tapahtumakuuntelijan lisäys elementille

```javascript
function onClick(event) {
  event.target.style.backgroundColor = 'skyblue';
}
const h2 = document.querySelector('#root h2');
if (h2) {
  h2.addEventListener('click', onClick);
}
// Jos kuuntelijoita lisätään dynaamisesti esimerkiksi käyttäjän toimenpiteistä
// johtuen, on kuuntelijat vastaavasti syytä poistaa hallitusti, jotta muistivuotoja
// ei pääse tapahtumaan.
// h1.removeEventListener('click', onClick);
```

[Events-dokumentaatio MDN:ssä](https://developer.mozilla.org/docs/Web/Events)

