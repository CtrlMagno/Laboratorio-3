import { BaseComponent } from '../BaseComponent';

export class Card extends BaseComponent {
    private name: string = '';
    private description: string = '';
    private image: string = '';
    private male_weight: number = 0;
    private female_weight: number = 0;
    private showWeights: boolean = false;

    static get observedAttributes() {
        return ['name', 'description', 'image', 'male_weight', 'female_weight'];
    }

    constructor() {
        super();
        this.name = this.getAttribute('name') || '';
        this.description = this.getAttribute('description') || '';
        this.image = this.getAttribute('image') || '';
        this.male_weight = Number(this.getAttribute('male_weight')) || 0;
        this.female_weight = Number(this.getAttribute('female_weight')) || 0;
    }

    protected render(): void {
        this.shadow.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px;
                    max-width: 300px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .card:hover {
                    transform: scale(1.02);
                }
                .card h2 {
                    margin-top: 0;
                    color: #333;
                }
                .card p {
                    color: #666;
                }
                .card img {
                    width: 100%;
                    border-radius: 4px;
                    margin-bottom: 12px;
                }
                .weight-section {
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid #eee;
                    display: ${this.showWeights ? 'block' : 'none'};
                }
                .weight-section p {
                    margin: 4px 0;
                }
                .click-hint {
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                    margin-top: 8px;
                }
            </style>

            <div class="card">
                ${this.image ? `<img src="${this.image}" alt="${this.name}">` : ''}
                <h2>${this.name}</h2>
                <p>${this.description}</p>

                <div class="weight-section">
                    <p>Male Weight: ${this.male_weight} kg</p>
                    <p>Female Weight: ${this.female_weight} kg</p>
                </div>
                <div class="click-hint">Click to ${this.showWeights ? 'hide' : 'show'} weight information</div>
            </div>
        `;


        const cardElement = this.shadow.querySelector('.card');
        if (cardElement) {
            cardElement.addEventListener('click', () => {
                this.showWeights = !this.showWeights;
                this.render();
            });
        }
    }

    protected connectedCallback(): void {
        this.render();
    }

    protected disconnectedCallback(): void {

    }

    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'name') {
            this.name = newValue;
        } else if (name === 'description') {
            this.description = newValue;
        } else if (name === 'image') {
            this.image = newValue;
        } else if (name === 'male_weight') {
            this.male_weight = Number(newValue) || 0;
        } else if (name === 'female_weight') {
            this.female_weight = Number(newValue) || 0;
        }
        this.render();
    }
}

customElements.define('custom-card', Card); 