export abstract class BaseComponent extends HTMLElement {
    protected shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    protected abstract render(): void;
    protected abstract connectedCallback(): void;
    protected abstract disconnectedCallback(): void;
    protected abstract attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
} 