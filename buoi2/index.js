async function getPokeData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return data = await response.json()
}
let currentPoke = undefined

//render sellected pokemon
document.querySelector('.search').addEventListener('submit', async (e) => {
    e.preventDefault()
    const pokeId = document.querySelector('.search').pokeId.value
    if (pokeId >= 895 || pokeId < 1) {
        alert('pokemon ID must be between 1 and 894')
    } else {
        currentPoke = await getPokeData(pokeId)
        document.querySelector('.sellected-poke').innerHTML = `
            <div class="poke-wrapper">
                <div class="poke-name" id="sellected-poke-name">${currentPoke.name}</div>
                <img src="${currentPoke.sprites.back_default}" alt=""
                    class="poke-img" id="sellected-poke-img">
            </div>
            `
    }
})
let deckString = localStorage.deck || '{"deck1": [], "deck2": []}'
let deck = JSON.parse(deckString)
function addPokemon(number) {
    if (currentPoke) {
        const tempId = generateID()
        document.querySelector(`#deck-poke-wrapper-${number}`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${tempId}">
            <div class="poke-name">${currentPoke.name}</div>
            <img src="${currentPoke.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke(${number}, this.parentNode.id)">x</button>
        </div>
        `)
        deck[`deck${number}`].push({pokeId: currentPoke.id, elementId: tempId})
        deckString = localStorage.deck = JSON.stringify(deck)
    }
}

async function renderDeck(number) {
    for (let poke of deck[`deck${number}`]) {
        const pokeData = await getPokeData(poke.pokeId)
        document.querySelector(`#deck-poke-wrapper-${number}`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${poke.elementId}">
            <div class="poke-name">${pokeData.name}</div>
            <img src="${pokeData.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke(${number}, this.parentNode.id)">x</button>
        </div>
        `)
    }
}
//render deck
for (let i = 0; i < Object.keys(deck).length; i++) {
    document.querySelector('.container').insertAdjacentHTML('beforeend', `
    <div class="deck-container">
        <div class="deck-name-wrapper">
            <div class="deck-name">Deck ${i+1}</div>
            <button class="add-btn" onclick="addPokemon(${i+1})">+</button>
        </div>
        <div class="deck-poke-wrapper" id="deck-poke-wrapper-${i+1}"></div>
    </div>
    `)
    renderDeck(i+1)
}


function generateID() {
    return new Date().valueOf().toString(36) + Math.random().toString(36).substr(2)
}
function deletePoke(number, id) {
    document.getElementById(`${id}`).remove()
    deck[`deck${number}`] = deck[`deck${number}`].filter(poke => poke.elementId !== id)
    deckString = localStorage.deck = JSON.stringify(deck)
}
//add new deck
document.querySelector('.add-deck').addEventListener('click', (e) => {
    e.preventDefault
    document.querySelector('.container').insertAdjacentHTML('beforeend', `
    <div class="deck-container">
        <div class="deck-name-wrapper">
            <div class="deck-name">Deck ${Object.keys(deck).length+1}</div>
            <button class="add-btn" onclick="addPokemon(${Object.keys(deck).length+1})">+</button>
        </div>
        <div class="deck-poke-wrapper" id="deck-poke-wrapper-${Object.keys(deck).length+1}"></div>
    </div>
    `)
    deck[`deck${Object.keys(deck).length+1}`] = []
    deckString = localStorage.deck = JSON.stringify(deck)
})
