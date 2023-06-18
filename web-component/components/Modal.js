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
            max-width: 300px;
            box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
            border-radius: 0.5rem;
            z-index: 2;
        }

        input {
            width: 100%;
            padding: 0.5rem;
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
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 0;
        }

        .title {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 10px 0;
        }

        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        select {
          width: 100%;
          padding: 0.5rem;
        }


        .btn-add-product {
          margin: 20px;
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
        .btn-add-product:hover {
          filter: brightness(1.2);
          box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.5);
        }

        .btn-add-product:active {
          transform: scale(0.98);
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

// DONT delete this code, chovi te conozco no lo hagas
//////////////////////////////////7
// this.$inputs = this.$modalBody.querySelectorAll("input");
// this.$inputs.forEach((input) => {
//   input.addEventListener("change", (e) => {
//     this.querySelector(`input[name="${input.name}"]`).value = input.value;
//   });
// });
