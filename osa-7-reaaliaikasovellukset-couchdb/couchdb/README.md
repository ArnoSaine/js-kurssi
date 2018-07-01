# CouchDB

### Data tallennetaan JSON-dokumentteina

```javascript
{
  "_id": "407804",
  "_rev": "1-5f14bab1a1e9ac3ebdf85905f47fb084",
  "year": 2000,
  "title": "Where the Heart Is"
}
```

### Datan etsintä [JSON-query syntaksin](http://docs.couchdb.org/en/latest/api/database/find.html) avulla ja tietokantaan tallennetuista [näkymistä](http://docs.couchdb.org/en/latest/api/ddoc/views.html)

#### JSON-query -esimerkki:

```javascript
{
  "selector": {
    "year": {"$gt": 2010}
  },
  "fields": ["_id", "_rev", "year", "title"],
  "sort": [{"year": "asc"}],
  "limit": 2,
  "skip": 0
}
```

#### Tietokantaan tallennetun map-funktion \(näkymän\) esimerkki:

```javascript
function(doc) {
  if (doc.date && doc.title) {
    emit(doc.date, doc.title);
  }
}
```

### Jokainen muutos versioidaan

* Hajautetun sovelluksen \(kuten mikä tahansa _single-page application_\) tekeminen on helpompaa

### Dokumenttien muutoksia voidaan kuunnella

[CouchDB – The Definitive Guide](http://guide.couchdb.org/editions/1/en/index.html)

