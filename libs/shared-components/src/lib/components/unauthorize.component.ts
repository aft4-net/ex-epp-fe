
export class UnauthorizePage extends HTMLElement {
  public static observedAttributes = ['title'];

  connectedCallback() {
    console.log('Appended and connected to document')
  }

  disconnectedCallback() {
    console.log('Disconnected from document')
  }

  attributeChangedCallback(name: string, old: string, value: string) {
    console.log(`Element's attribute ${name} was ${old} and is now ${value}`);
    this.innerHTML = `<h1>Welcome From </h1>`;
  }
}

//customElements.define('demo-title', UnauthorizePage);