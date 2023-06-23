const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      background: #11101d;
      margin-left: 20px;
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

    #main-button {
      color: #fff;
    }
    
    #main-button:hover span {
      color: #ef4444; 
    }

    .left-margin{
      margin-left: 30px;
    }

    #main-button.selected {
      color: #ef4444 !important;
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
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$children = this._shadowRoot.querySelector("slot");
    this.$button = this._shadowRoot.querySelector("#main-button");
    this.$addButton = this._shadowRoot.querySelector("#add-child");

    const assignedNodes = this.$children.assignedNodes();
    this.text = this.formatText(assignedNodes[0].textContent);
    if (assignedNodes.length == 1) {
      this.$button.innerHTML = `
        <span class="left-margin">
          ${this.text}
        </span>
      `;
      assignedNodes[0].textContent = "";
    } else if (assignedNodes.length > 1) {
      this.$button.innerHTML = `
        <chevron-icon direction="0"></chevron-icon>
        <span>${this.text}</span>
      `;
      this.$icon = this._shadowRoot.querySelector("chevron-icon");
      assignedNodes[0].textContent = "";
    }
    this.$button.addEventListener("click", () => {
      this.showChildren();
      if (this.handleClick) {
        this.handleClick(this.text);
        this.$button.classList.add("selected");
        if (this.$icon) this.$icon.toggleColor();
      }
    });
    this.$addButton.addEventListener("click", () => {
      this.addTreeItem(this._shadowRoot.querySelector("#child-name").value);
    });

    this.$button.addEventListener("mouseover", () => {
      if (this.$icon) {
        this.$icon._shadowRoot.querySelector("svg").classList.add("hovered");
      }
    });

    this.$button.addEventListener("mouseout", () => {
      if (this.$icon) {
        this.$icon._shadowRoot.querySelector("svg").classList.remove("hovered");
      }
    });
  }

  formatText(text) {
    const strippedText = text.trim();
    return strippedText;
  }

  static get observedAttributes() {
    return [];
  }

  addTreeItem(text) {
    const template = document.createElement("template");
    template.innerHTML = `
      <tree-item">${text}</tree-item>
    `;
    this.appendChild(template.content.cloneNode(true));
  }

  removeSelectedClass() {
    if (this.$button.classList.contains("selected")) {
      this.$button.classList.remove("selected");
      if (this.$icon) this.$icon.toggleColor();
    }
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
