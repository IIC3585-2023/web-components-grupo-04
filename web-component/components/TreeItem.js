const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      background: #11101d;
    }

    #main-button {
      all: unset;
      cursor: pointer;
      padding: 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
    }


    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    #child-name {
      display: none;
    }

    #add-child {
      display: none;
    }

    slot {
        display: none;
    }
  </style>

  <div class="container">
    <div class="button-container">
      <button id="main-button"></button>
      <input id="child-name" type="text" placeholder="Child name" />
      <button id="add-child">+</button>
    </div>
    <slot></slot>
  </div>
`;

export default class TreeItem extends HTMLElement {
  constructor() {
    super();
    if (this.handleClick)
      this.handleClick = this.handleClick.bind(this) || null;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$children = this._shadowRoot.querySelector("slot");
    this.$button = this._shadowRoot.querySelector("#main-button");
    this.$addButton = this._shadowRoot.querySelector("#add-child");

    const assignedNodes = this.$children.assignedNodes();
    this.text = this.formatText(assignedNodes[0].textContent);
    if (assignedNodes.length == 1) {
      this.$button.innerHTML = `
        <span style='color: #fff; margin-left: 30px;'>
          ${this.text}
        </span>
      `;
      assignedNodes[0].textContent = "";
    } else if (assignedNodes.length > 0) {
      this.$button.innerHTML = `
        <chevron-icon direction="0"></chevron-icon>
        <span style='color: #fff;'>${this.text}</span>
      `;
      this.$icon = this._shadowRoot.querySelector("chevron-icon");
      assignedNodes[0].textContent = "";
    }
    if (!this.attributes.isRoot)
      this._shadowRoot.querySelector(".container").style.marginLeft = "20px";
    this.$button.addEventListener("click", () => {
      this.showChildren();
      if (this.handleClick) {
        this.handleClick(this.text);
      }
    });
    this.$addButton.addEventListener("click", () => {
      this.addTreeItem(this._shadowRoot.querySelector("#child-name").value);
    });
  }

  formatText(text) {
    const strippedText = text.trim();
    return strippedText;
  }

  static get observedAttributes() {
    return ["isRoot"];
  }

  addTreeItem(text) {
    const template = document.createElement("template");
    template.innerHTML = `
      <tree-item">${text}</tree-item>
    `;
    this.appendChild(template.content.cloneNode(true));
  }

  showChildren() {
    if (this.$children.style.display === "block") {
      this.$children.style.display = "none";
      if (this.$icon) this.$icon.direction = 0;
    } else {
      this.$children.style.display = "block";
      if (this.$icon) this.$icon.direction = 90;
    }
  }
}
