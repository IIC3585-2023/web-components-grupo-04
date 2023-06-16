import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class Product extends LitElement {
  static get styles() {
    return [style];
  }

  connectedCallback() {
    super.connectedCallback();
    this.name = this.getAttribute("name");
    this.price = this.getAttribute("price");
    this.rating = this.getAttribute("rating");
    this.img = this.getAttribute("img");
  }

  render() {
    return html`
        <img src="${this.img}" alt="${this.name}" />
        <span class="name">${this.name}</span>
        <span class="price">$ ${this.price}</span>
        <rating-component rating="${this.rating}" />
    `;
  }
}

const style = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px 2px rgba(0,0,0,0.2);
  }

  .name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  img {
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 100%;
    user-select: none;
  }

  rating-component {
    margin: 10px 0;
  }
`;
