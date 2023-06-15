import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class RatingComponent extends LitElement {
  static get styles() {
    return [style];
  }

  connectedCallback() {
    super.connectedCallback();
    this.rating = this.getAttribute("rating");
  }

  render() {
    return html`
      <div class="container">
        No critiquen es testeo cabros
        <span class="rating">${this.rating}</span>
      </div>
    `;
  }
}

const style = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }
`;
