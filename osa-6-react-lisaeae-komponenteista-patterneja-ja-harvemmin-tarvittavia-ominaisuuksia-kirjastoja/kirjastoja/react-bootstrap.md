# React-Bootstrap

* Bootstrap-tyylien käyttö React-komponentteina
* Projekteissa joissa käytetään Bootstrapia, vastaava komponentti-abstraktio olisi muuten syytä kirjoittaa itse

  ```jsx
  <div className="row">
    <div className="col-xs-4">...</div>
  </div>
  // Vs.
  <Row>
    <Col xs={4}>...</Col>
  </Row>
  ```

{% hint style="info" %}
Tekee ainoastaan HTML-elementit Bootstrapin mallin mukaan – CSS-tiedosto ei kuulu pakettiin, vaan se on lisättävä sovellukseen erikseen
{% endhint %}

[React Bootstrap](https://react-bootstrap.github.io/)

