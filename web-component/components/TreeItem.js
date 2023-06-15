const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      margin-left: 20px;
      flex-direction: column;
    }

    slot {
        display: none;
    }

  </style>

  <div class="container">
    <button></button>
    <slot></slot>
  </div>
`;

export default class TreeItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    const $children = this._shadowRoot.querySelector("slot");
    const $button = this._shadowRoot.querySelector("button");

    // Set the button's text to the text attribute of the custom element
    $button.innerText = this.formatText(
      $children.assignedNodes()[0].textContent
    );
    // remove the text from the slot
    $children.assignedNodes()[0].textContent = "";
    $button.addEventListener("click", this.showChildren.bind(this));
  }

  formatText(text) {
    const strippedText = text.trim();
    return strippedText;
  }

  showChildren() {
    const $children = this._shadowRoot.querySelector("slot");
    $children.style.display =
      $children.style.display === "block" ? "none" : "block";
  }
}
