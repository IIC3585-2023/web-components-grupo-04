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

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    slot {
        display: none;
    }
  </style>

  <div class="container">
    <div class="button-container">
      <button id="main-button"></button>
      <input type="text" placeholder="child name" id="child-name" />
      <button id="add-child">Add Child</button>
    </div>
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
    this.$addButton = this._shadowRoot.querySelector("#add-child");

    const assignedNodes = this.$children.assignedNodes();
    if (assignedNodes.length > 0) {
      const text = this.formatText(assignedNodes[0].textContent);
      this.$button.innerHTML = `
        <chevron-icon direction="0"></chevron-icon>
        <span>${text}</span>
      `;
      this.$icon = this._shadowRoot.querySelector("chevron-icon");
      assignedNodes[0].textContent = "";
    }

    this.$button.addEventListener("click", () => {
      this.showChildren();
    });
    this.$addButton.addEventListener("click", () => {
      this.addTreeItem(this._shadowRoot.querySelector("#child-name").value);
    });
  }

  formatText(text) {
    const strippedText = text.trim();
    return strippedText;
  }

  addTreeItem(text) {
    const template = document.createElement("template");
    template.innerHTML = `
      <tree-item>${text}</tree-item>
    `;
    this.appendChild(template.content.cloneNode(true));
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
