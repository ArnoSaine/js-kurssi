const button = (onClick, children) =>
  `<button onClick="${onClick}">${children}</button>`;

const h1 = children => `<h1>${children}</h1>`;
const cardTitle = ({ name, version }) => `<li>${name}@${version}</li>`;
const card = ({ name, version, ...statistics }) => `
  <h3>${name}@${version}</h3>
  <ul>
    ${Object.entries(statistics)
      .map(([prop, value]) => `<li>${prop}: ${value}</li>`)
      .join('')}
  </ul>
`;

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

class App {
  constructor(root) {
    this.root = root;
    this.playerACards = [];
    this.playerBCards = [];
    this.update();
    this.getCards();
  }
  update() {
    this.root.innerHTML = this.render();
  }
  getCards() {
    fetch('/api/top-packages.json')
      .then(response => response.json())
      .then(cards => {
        this.cards = cards;
        this.update();
      });
  }
  start() {
    shuffle(this.cards);
    this.playerACards = this.cards.slice(0, this.cards.length / 2);
    this.playerBCards = this.cards.slice(this.cards.length / 2);
    this.update();
  }
  render() {
    return `
      ${h1('npm Package Expert')}
      ${button('app.start()', 'Start')}
      ${this.cards ? `<ul>${this.cards
            .map(cardTitle)
            .join('')}</ul>` : 'Loading...'}
      ${/* Molemmilla pelaajilla on kortteja? */
      this.playerACards.length && this.playerBCards.length ? card(this.playerACards[0]) : ''}
    `;
  }
}

const app = new App(document.getElementById('root'));
