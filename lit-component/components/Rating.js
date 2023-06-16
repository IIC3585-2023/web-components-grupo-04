import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class Rating extends LitElement {
  constructor() {
    super();
    this.rating = 1; // Initialize the rating to 0
    this.$colorActive = "red";
    this.$colorInactive = "#ff00008f";
  }

  static get properties() {
    return {
      rating: { type: Number },
    };
  }

  static get styles() {
    return [style];
  }

  connectedCallback() {
    super.connectedCallback();
    this.rating = parseInt(this.getAttribute("rating")) || 0; // Parse the rating attribute as an integer
  }

  render() {
    return html`
      <div class="container">
        ${this.renderHeartIcons()}
      </div>
    `;
  }

  renderHeartIcons() {
    const heartIcons = [];
    for (let i = 1; i <= 5; i++) {
      heartIcons.push(html`
        <heart-icon
          color="${this.rating >= i ? this.$colorActive : this.$colorInactive}"
          size="20px"
          @click="${() => this.updateRating(i)}"
        ></heart-icon>
      `);
    }
    return heartIcons;
  }

  updateRating(value) {
    this.rating = value;
  }
}

const style = css`
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  heart-icon {
    margin: 0 3px;
    cursor: pointer;
  }
`;
