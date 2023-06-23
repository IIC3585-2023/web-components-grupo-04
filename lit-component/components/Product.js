import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class Product extends LitElement {
  constructor() {
    super();
    this.addToCart = null;
    this.deleteFromCart = null;
    this.categories = [];
    this.name = "";
    this.price = 0;
    this.rating = 1;
    this.discount = false;
    this.img = "";
  }

  static get styles() {
    return [style];
  }

  static get properties() {
    return {
      addToCart: { type: Function },
      deleteFromCart: { type: Function },
      categories: { type: Array },
      name: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.name = this.getAttribute("name");
    this.price = this.getAttribute("price");
    this.rating = this.getAttribute("rating");
    this.categories = this.getAttribute("categories").split(",");
    this.discount = this.getAttribute("discount") || false;
    this.img = this.getAttribute("img");
  }

  renderPrice() {
    if (this.discount) {
      return html`
        <div class="price-container">
          <div class="previous-price">
            <span class="price-crossed"
              ><span class="price-tag">$</span>${this.price}
            </span>
            <span class="discount">-%${this.discount}</span>
          </div>
          <span class="price"
            ><span class="price-tag">$</span>${(
              this.price -
              (this.discount * this.price) / 100
            ).toFixed(2)}</span
          >
        </div>
      `;
    }
    return html`<span class="price"
      ><span class="price-tag">$</span>${this.price}</span
    >`;
  }

  handleAddToCart() {
    if (typeof this.addToCart === "function") {
      const event = new CustomEvent("addToCart", {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          price: this.price,
          rating: this.rating,
          discount: this.discount,
          img: this.img,
        },
      });
      this.addToCart(event); // Invoke the function with the event as an argument
    }
  }

  handleDeleteFromCart() {
    console.log("uwu")
    if (typeof this.deleteFromCart === "function") {
      const event = new CustomEvent("deleteFromCart", {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
        },
      });
      this.deleteFromCart(event); // Invoke the function with the event as an argument
    }
  }

  render() {
    return html`
      <div class="container-img">
        <img src="${this.img}" alt="${this.name}" />
      </div>
      <div class="info-product">
        <span class="name">${this.name}</span>
        ${this.renderPrice()}
        <rating-component rating="${this.rating}"></rating-component>
        <button class="btn" @click="${this.handleAddToCart}">
          Add to cart
        </button>
        <button class="btn" @click="${this.handleDeleteFromCart}">Remove from cart</button>
      </div>
    `;
  }
}

const style = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 0.5rem;
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
    position: relative;
    background-color: white;
  }

  .container-img {
    position: relative;
    top: -10px;
    left: -40px;
    display: flex;
    background-color: #333;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    max-width: 200px;
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
  }

  .btn {
    padding: 1.5em 2em;
    border: none;
    border-radius: 7px;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 1.3px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #ef4444;
    color: white;
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
  }

  .btn:hover {
    filter: brightness(1.2);
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.5);
  }

  .btn:active {
    transform: scale(0.98);
  }

  .name {
    font-size: 1.2rem;
    font-weight: bold;
    max-width: 150px;
  }

  .price {
    font-size: 1.8rem;
    font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji,
      Segoe UI Symbol, Android Emoji, EmojiSymbols;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .price-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
  }

  .price-tag {
    font-size: 1rem;
  }

  .discount {
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 0.2rem;
    border-radius: 0.2rem;
    font-size: 0.8rem;
  }

  .info-product {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    padding: 10px 20px;
  }

  .price-crossed {
    text-decoration: line-through;
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #444;
  }

  .previous-price {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  img {
    object-fit: cover;
    user-select: none;
    max-width: 250px;
  }

  .container-img:hover {
    transform: scale(1.05);
  }

  rating-component {
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    :host {
      flex-direction: column;
    }
    .container-img {
      top: auto;
      left: auto;
    }
  }
`;
