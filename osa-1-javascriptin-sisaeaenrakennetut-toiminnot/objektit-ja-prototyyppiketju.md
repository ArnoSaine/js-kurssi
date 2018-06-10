# Objektit ja prototyyppiketju

* Kaikki on objekteja
* Objekteilla on propertyjä
* Propertyihin päästään käsiksi `.` ja `[]` -notaatioilla `x.prop === x['prop']`
  * `[]` käytetään, jos nimessä on erikoismerkkejä tai arvo tulee muuttujasta
* Objektilla on erikois-property `__proto__`\*, joka on viittaus toiseen objektiin
* Kun objektista `obj` luetaan property `"x"` \(`obj.x`\):
  1. Katsotaan ensin onko sennimistä omissa propertyissä
  2. Jos ei ole, katsotaan löytyykö `obj.__proto__.x`
  3. Prototype on tavallinen objekti, joten jos sillä ei ole `"x"`-propertyä, katsotaan löytyykö `obj.__proto__.__proto__.x` jne. kunnes property löytyy tai prototypeä ei ole
* Kirjoitus tehdään aina objektiin itseensä: `obj.x = 123;`

\* [Object.getPrototypeOf\(\)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf), [Object.prototype.\_\_proto\_\_](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

