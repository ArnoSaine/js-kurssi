# Muokkaus

### Elementin etsintä ja tyylin muokkaus

```javascript
const h1 = document.querySelector('#root h2');
if (h1) {
  // style-objektissa on elementin inline-tyylit.
  h1.style.backgroundColor = 'lime';
  // JavaScriptillä asetetut arvot voi myös lukea.
  console.log(h1.style.backgroundColor); // => "lime"
}
```

### Uuden elementin lisäys dokumenttiin

```javascript
const strong = document.createElement('strong');
const content = document.createTextNode('Jee!');
strong.appendChild(content);
const parent = document.querySelectorAll('#root h2')[1];
parent.appendChild(strong);
```

### Elementtien poisto

```javascript
// Poistaa parametrina annetun elementin parentiltaan.
function remove(element) {
  // Yksittäisen elementin poisto
  element.parentElement.removeChild(element);
}

// Etsitään kaikki `exerslide-slide`-CSS-luokan sisällä olevat h2
// -elementit.
const h2NodeList = document.querySelectorAll('#root h2');
// Käydään lista läpi.
// remove-funktiota kutsutaan listan jokaisella elementillä.
h2NodeList.forEach(remove);
```

* `querySelectorAll` palauttaa [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)-tyypin objektin
  * NodeList on taulukon kaltainen, mutta sillä ei ole kaikkia taulukon metodeja
  * NodeList voidaan muuttaa taulukoksi ES2015 spread-syntaksilla:
    * `const h2Array = [...h2NodeList];`

#### Uusissa selaimissa elementillä itsellään on `remove`-metodi \(vrt. edellä, jossa poisto oli parent-elementin metodi\)

```javascript
const h3 = document.querySelector('#root h3');
if (h3) {
  h3.remove();
}
```

[document.querySelector MDN:ssä](https://developer.mozilla.org/docs/Web/API/Document/querySelector)

[document.querySelectorAll MDN:ssä](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)

[document.createElement MDN:ssä](https://developer.mozilla.org/docs/Web/API/Document/createElement)

[node.appendChild MDN:ssä](https://developer.mozilla.org/docs/Web/API/Node/appendChild)

[node.removeChild MDN:ssä](https://developer.mozilla.org/docs/Web/API/Node/removeChild)

[childNode.remove MDN:ssä](https://developer.mozilla.org/docs/Web/API/ChildNode/remove)

