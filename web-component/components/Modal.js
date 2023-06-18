const template = document.createElement("template");

template.innerHTML = `
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            background-color: #fefefe;
            margin: auto;
            width: 100%;
            max-width: 500px;
            box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
            border-radius: 0.5rem;
        }

        .modal-header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        .close {
            font-size: 1.5rem;
            font-weight: bold;
            color: #aaa;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            background-color: transparent;
            border: none;
        }

        .modal-body {
            padding: 2rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 0;
        }

    </style>

    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
`;

export default class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$modal = this._shadowRoot.querySelector(".modal");
    this.$closeButton = this._shadowRoot.querySelector(".close");
    this.$modalBody = this._shadowRoot.querySelector(".modal-body");

    this.$closeButton.addEventListener("click", () => {
      this.hide();
    });
  }

  connectedCallback() {
    this.$modalBody.innerHTML = this.innerHTML;
  }

  show() {
    this.$modal.style.display = "flex";
  }

  hide() {
    this.$modal.style.display = "none";
  }
}
