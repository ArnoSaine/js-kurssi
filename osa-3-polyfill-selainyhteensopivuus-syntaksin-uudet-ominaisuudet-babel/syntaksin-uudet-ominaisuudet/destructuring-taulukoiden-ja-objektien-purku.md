# Destructuring \(taulukoiden ja objektien “purku”\)

```javascript
const { id, nimi = '(tuntematon)' } = henkilö;
const [eka, toka, ...loput] = lista;

// Sama vanhalla syntaksilla:
const id = henkilö.id;
const nimi = henkilö.nimi === undefined ? '(tuntematon)' : henkilö.nimi;
const eka = lista[0];
const toka = lista[1];
const loput = lista.slice(2);
```

* Paikallinen muuttuja tulee automaattisesti nimettyä samaksi kuin objektin property **→** Yhtenäiset nimet

