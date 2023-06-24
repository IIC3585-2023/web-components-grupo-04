import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class Rating extends LitElement {
  constructor() {
    super();
    this.rating = 1;
    this.ratingHover = 0;
    this.$colorActive = "#f43f5e";
    this.$colorInactive = "#fecdd3";
    this.$colorHover = "#be123c";
  }

  static get properties() {
    // reactive properties: when a property changes, the component will be re-rendered
    return {
      rating: { type: Number },
      ratingHover: { type: Number },
    };
  }

  static get styles() {
    return [style];
  }

  connectedCallback() {
    super.connectedCallback();
    this.rating = parseInt(this.getAttribute("rating")) || 0; // Parse the rating attribute as an integer
  }

  colorRender(i) {
    if (this.ratingHover >= i) {
      return this.$colorHover;
    } else if (this.rating >= i) {
      return this.$colorActive;
    }
    return this.$colorInactive;
  }

  renderHeartIcons() {
    const heartIcons = [];
    for (let i = 1; i <= 5; i++) {
      heartIcons.push(html`
        <heart-icon
          color="${this.colorRender(i)}"
          @mouseenter="${() => {
            this.ratingHover = i;
          }}"
          @mouseout="${() => (this.ratingHover = 0)}"
          size="20px"
          @click="${() => (this.rating = i)}"
        ></heart-icon>
      `);
    }
    return heartIcons;
  }

  render() {
    return html` <div class="container">${this.renderHeartIcons()}</div> `;
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
