import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export default class Cart extends LitElement {
  constructor() {
    super();
    this.products = {};
    this.$overflowContainer = null;
  }

  static get properties() {
    return {
      products: { type: Object },
    };
  }

  static get styles() {
    return [style];
  }

  addProduct(product) {
    if (this.products[product.name]) {
      this.products[product.name].quantity++;
    } else {
      this.products[product.name] = {
        ...product,
        quantity: 1,
      };
    }
    this.requestUpdate();
  }

  getTotal() {
    return Object.keys(this.products).reduce((acc, product) => {
      return (
        acc +
        (this.products[product].price -
          (this.products[product].discount * this.products[product].price) /
            100) *
          this.products[product].quantity
      );
    }, 0);
  }

  toggleOverflowContainer() {
    if (!this.$overflowContainer) {
      this.$overflowContainer = this.shadowRoot.querySelector(
        ".overflow-container"
      );
    }
    if (this.$overflowContainer.style.height === "0px") {
      this.$overflowContainer.style.height = "200px";
      this.$overflowContainer.style.padding = "0.5rem 0";
    } else {
      this.$overflowContainer.style.height = "0px";
      this.$overflowContainer.style.padding = "0px";
    }
  }

  removeProduct(product) {
    delete this.products[product];
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="header-cart">
        <span class="title">ShoppingCart</span>
        <button @click=${() => this.toggleOverflowContainer()}>
          Show/Hide
        </button>
      </div>
      <div class="overflow-container">
        ${Object.keys(this.products).map(
          (product) => html`
            <div class="product-row">
              <button
                @click=${() => this.removeProduct(product)}
                style="font-size:1.5rem;padding:0.25rem 0.75rem"
              >
                &times;
              </button>
              <span class="name">${product}</span>
              <span class="price-tag"
                >$
                ${(
                  this.products[product].price -
                  (this.products[product].discount *
                    this.products[product].price) /
                    100
                ).toFixed(2)}
              </span>
              <input
                type="number"
                .value="${this.products[product].quantity}"
                min="0"
                @change=${(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  this.products[product].quantity = e.target.value;
                  this.requestUpdate();
                }}
              />
            </div>
          `
        )}
      </div>
      <span class="total">Total: $${this.getTotal().toFixed(2)}</span>
    `;
  }
}

const style = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    max-width: 500px;
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
  }

  .name {
    width: 50%;
  }

  .header-cart {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0;
    width: 100%;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem 0;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    filter: brightness(0.9);
    transform: scale(0.98);
  }

  input {
    width: 50px;
  }

  .overflow-container {
    overflow-y: auto;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: whitesmoke;
    width: 100%;
    padding: 0.5rem 0;
    box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }

  .total {
    font-size: 1.5rem;
    width: 95%;
    padding: 0.5rem 0;
  }

  .price-tag,
  .total {
    font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji,
      Segoe UI Symbol, Android Emoji, EmojiSymbols;
  }

  .product-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    width: 95%;
    background-color: white;
  }

  @media (max-width: 728px) {
    .title {
      font-size: 1rem;
    }

    .total {
      font-size: 1rem;
    }
  }
`;
