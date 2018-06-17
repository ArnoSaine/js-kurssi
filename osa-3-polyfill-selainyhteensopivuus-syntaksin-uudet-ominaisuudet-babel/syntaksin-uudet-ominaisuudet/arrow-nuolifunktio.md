# Arrow \(“nuolifunktio”\)

### 1. Lyhyempi syntaksi kirjoittaa “oneliner” -funktioita

* Mikäli funktiosta palautetaan välittömästi arvo, voidaan bodysta jättää `{}`-merkit ja `return` pois
* Jos parametreja on tarkalleen 1, voi `()`-merkit jättää pois parametrilistan ympäriltä

```javascript
const double = number => number * 2;
double(4); // => 8
```

### 2. Käyttää samaa this-arvoa, kuin ulompi funktio jossa nuolifunktio määritetään

```javascript
const bob = {
  name: 'Bob',
  friends: ['Alice'],
  printFriends() {
    this.friends.forEach(name =>
      console.log(`${this.name} knows ${name}`) // => "Bob knows Alice"
    );
  }
};
```

Esimerkki pohjautuu [Learn ES2015](https://babeljs.io/learn-es2015/#arrows-and-lexical-this) -sivun esimerkkiin.

