# Tehtävä

1. Avaa Babel REPL [tästä](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABFATgQzAZ2HFBbACigFMAPKASkQG8AoRRFYqEFJE8gbloF9baICTFES4YAcxhg0AG0QBeRAHI0AIwgATpd0FYRqDNlx5iAEwXJ0WHPgJjJ0mRW4ChcGcQB0MuOKJWjfDNnRAB6UMQAIkxTYDRIoA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=&prettier=false&targets=&version=7.18.12&externalPlugins=&assumptions=%7B%7D)
2. Avaa selaimen developer tools \(F12\) ja sieltä JavaScript-konsoli
3. Muokkaa `transform`-funktiota siten, että se paluttaa tekstin, jossa `text`-parametrin kirjaimet ovat siirretty QWERTY-näppäimistössä oikealle, eli `q` → `w`, `a` → `s`, `m` → `z`, jne.
   * Käytä ratkaisussa edellä mainittuja String- ja Array-prototyyppien funktioita
   * Pyri funktionaaliseen ratkaisuun
     * Vältä `while`- ja `for`-rakenteita ja `let`- ja `var`-muuttujia

### Lisätehtävä

1. Siirtofunktio toiseen suuntaan, jolla “salakirjoituksen” voi purkaa
2. Yhteisen toiminnallisuuden erotus omiin funktioihin
3. Numeroiden käsittely: `1` → `2`, `2` → `3`, …`0` → `1`
4. Isojen kirjainten käsittely
5. Erikoismerkkien käsittely
   * Erikoismerkit palautetaan sellaisenaan

