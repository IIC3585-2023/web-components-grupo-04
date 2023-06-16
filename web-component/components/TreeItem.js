const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      background-color: #fbfbfb;
    }

    #main-button {
      all: unset;
      cursor: pointer;
      padding: 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    #main-button:hover{
      background-color: #efefef;
    }

    slot {
        display: none;
    }
  </style>

  <div class="container">
    <button id="main-button"></button>
    <slot></slot>
  </div>
`;

export default class TreeItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$children = this._shadowRoot.querySelector("slot");
    this.$button = this._shadowRoot.querySelector("#main-button");

    // Set the button's text to the text attribute of the custom element
    const text = this.formatText(this.$children.assignedNodes()[0].textContent);
    this.$button.innerHTML = `
      <chevron-icon direction="0"></chevron-icon>
      <span>${text}</span>
    `;
    this.$icon = this._shadowRoot.querySelector("chevron-icon");

    // remove the text from the slot
    this.$children.assignedNodes()[0].textContent = "";

    this.$button.addEventListener("click", () => {
      this.showChildren();
    });
  }

  formatText(text) {
    const strippedText = text.trim();
    return strippedText;
  }

  showChildren() {
    if (this.$children.style.display === "block") {
      this.$children.style.display = "none";
      this.$icon.direction = 0;
    } else {
      this.$children.style.display = "block";
      this.$icon.direction = 90;
    }
  }
}
