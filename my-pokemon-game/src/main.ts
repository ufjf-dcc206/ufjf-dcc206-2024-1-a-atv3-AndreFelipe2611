import './style.css';
import './components/pokemonCard'; 

// Função para buscar 10 Pokémon aleatórios da API
async function fetchRandomPokemon(): Promise<any[]> {
    const pokemonIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 898) + 1);

    const pokemonPromises = pokemonIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );

    return Promise.all(pokemonPromises);
}

// Função para configurar o jogo
async function setupGame() {
    const gameContainer = document.querySelector<HTMLDivElement>('#app')!;
    
    // Busca 10 Pokémon 
    const allPokemon = await fetchRandomPokemon();
    const playerA = allPokemon.slice(0, 5); 
    const playerB = allPokemon.slice(5, 10); 

    // Função para criar a linha de cartas de um jogador
    const createPlayerRow = (pokemons: any[]) => {
        const row = document.createElement('div');
        row.classList.add('player-row');
        
        pokemons.forEach(pokemon => {
            const card = document.createElement('pokemon-card');
            card.setAttribute('name', pokemon.name);
            card.setAttribute('image', pokemon.sprites.front_default);
            card.setAttribute('types', pokemon.types.map((t: any) => t.type.name).join(','));

            card.addEventListener('card-click', (e: Event) => handleCardClick(e as CustomEvent)); // Corrigido o tipo do evento
            row.appendChild(card);
        });

        return row;
    };

    // Função para lidar com o clique na carta
    const handleCardClick = (event: CustomEvent) => {
        const gameArea = document.getElementById('game-area')!;
        
        const { name, image, types } = event.detail;

       
        gameArea.innerHTML = ''; 
        const playedCard = document.createElement('pokemon-card');
        playedCard.setAttribute('name', name);
        playedCard.setAttribute('image', image);
        playedCard.setAttribute('types', types.join(','));
        gameArea.appendChild(playedCard);
    };

    
    gameContainer.innerHTML = `
        <div class="player-area player-a"></div>
        <div id="game-area" class="game-area"></div>
        <div class="player-area player-b"></div>
    `;

   
    const playerARow = createPlayerRow(playerA); 
    const playerBRow = createPlayerRow(playerB);

    document.querySelector('.player-a')?.appendChild(playerARow);
    document.querySelector('.player-b')?.appendChild(playerBRow);
}


setupGame();
