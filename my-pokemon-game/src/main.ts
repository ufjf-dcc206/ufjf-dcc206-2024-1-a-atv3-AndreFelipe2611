import './style.css';
import './components/PokemonCard';

// Função para buscar 10 Pokémon aleatórios da PokéAPI
async function fetchRandomPokemon(): Promise<any[]> {
    // Busca 10 pokémon no total
    const pokemonIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 898) + 1);
    const pokemonPromises = pokemonIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );

    return Promise.all(pokemonPromises);
}

// Função para configurar o jogo
async function setupGame() {
    const gameContainer = document.querySelector<HTMLDivElement>('#app')!;
    
    // Busca os 10 Pokémon (5 para cada jogador)
    const pokemons = await fetchRandomPokemon();
    const playerA = pokemons.slice(0, 5);  // 5 primeiros para o jogador A
    const playerB = pokemons.slice(5, 10); // 5 últimos para o jogador B

    // Função para criar a linha de cartas de um jogador
    const createPlayerRow = (pokemons: any[], player: string) => {
        const row = document.createElement('div');
        row.classList.add('player-row');
        
        pokemons.forEach(pokemon => {
            const card = document.createElement('pokemon-card');
            card.setAttribute('name', pokemon.name);
            card.setAttribute('image', pokemon.sprites.front_default);
            card.setAttribute('types', pokemon.types.map((t: any) => t.type.name).join(','));

            // Adiciona o evento de clique em cada carta
            card.addEventListener('card-click', (e: CustomEvent) => handleCardClick(e));
            row.appendChild(card);
        });

        return row;
    };

    // Função para lidar com o clique na carta
    const handleCardClick = (event: CustomEvent) => {
        const gameArea = document.getElementById('game-area')!;
        
        // Limpa a área de jogo antes de adicionar um novo Pokémon
        gameArea.innerHTML = '';

        const { name, image, types } = event.detail;

        const playedCard = document.createElement('pokemon-card');
        playedCard.setAttribute('name', name);
        playedCard.setAttribute('image', image);
        playedCard.setAttribute('types', types.join(','));
        
        gameArea.appendChild(playedCard);
    };

    // Adiciona a estrutura do jogo ao HTML
    gameContainer.innerHTML = `
        <div class="player-area player-a"></div>
        <div id="game-area" class="game-area"></div>
        <div class="player-area player-b"></div>
    `;

    // Renderiza as linhas dos jogadores A e B
    const playerARow = createPlayerRow(playerA, 'A');
    const playerBRow = createPlayerRow(playerB, 'B');

    document.querySelector('.player-a')?.appendChild(playerARow);
    document.querySelector('.player-b')?.appendChild(playerBRow);
}

// Chama a função para configurar o jogo quando a página carregar
setupGame();
