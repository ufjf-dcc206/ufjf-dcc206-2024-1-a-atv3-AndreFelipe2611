class PokemonCard extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const image = this.getAttribute('image');
        const types = this.getAttribute('types')?.split(',') || [];

        this.shadow.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 10px;
                    text-align: center;
                    width: 150px;
                    margin: 5px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .card:hover {
                    transform: scale(1.05);
                }
                .pokemon-image {
                    width: 100px;
                    height: 100px;
                }
                .pokemon-types {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                }
                .pokemon-type {
                    background-color: #eee;
                    border-radius: 3px;
                    padding: 3px 6px;
                    margin: 0 5px;
                }
            </style>
            <div class="card">
                <img class="pokemon-image" src="${image}" alt="${name}">
                <h3>${name}</h3>
                <div class="pokemon-types">
                    ${types.map(type => `<span class="pokemon-type">${type}</span>`).join('')}
                </div>
            </div>
        `;

        this.shadow.querySelector('.card')?.addEventListener('click', () => {
            const event = new CustomEvent('card-click', {
                detail: { name, image, types }
            });
            this.dispatchEvent(event);
        });
    }
}

// Registra o WebComponent
customElements.define('pokemon-card', PokemonCard);
