const template = document.createElement("template");
template.innerHTML = `
<style>
    svg {
        margin: 0 10px;
        width: 0.5rem;
        aspect-ratio: 1;
    }
    
    .selected{
      fill: #ef4444 !important;
    }

</style>

<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" id="chevron-svg">
    <path
        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
    />
</svg>
`;

export default class ChevronIcon extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$icon = this._shadowRoot.querySelector("svg");
  }

  static get observedAttributes() {
    return ["direction"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "direction") {
      this.$icon.style.transform = `rotate(${newValue}deg)`;
    }
  }

  get direction() {
    return this.getAttribute("direction");
  }

  set direction(value) {
    this.setAttribute("direction", value);
  }

  connectedCallback() {
    if (!this.hasAttribute("direction")) {
      this.setAttribute("direction", "0");
    }
  }

  render() {
    this.$icon.style.transform = `rotate(${this.direction}deg)`;
  }

  toggleColor() {
    this.$icon.classList.toggle("selected");
  }
}
