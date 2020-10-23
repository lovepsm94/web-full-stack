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
let deck1String = localStorage.deck1 || '[]'
let deck1 = JSON.parse(deck1String)
let deck2String = localStorage.deck2 || '[]'
let deck2 = JSON.parse(deck2String)
function addPokemon1() {
    if (currentPoke) {
        const tempId = generateID()
        document.querySelector(`#deck-poke-wrapper-1`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${tempId}">
            <div class="poke-name">${currentPoke.name}</div>
            <img src="${currentPoke.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke1(this.parentNode.id)">X</button>
        </div>
        `)
        deck1.push({pokeId: currentPoke.id, elementId: tempId})
        deck1String = localStorage.deck1 = JSON.stringify(deck1)
    }
}
function addPokemon2() {
    if (currentPoke) {
        const tempId = generateID()
        document.querySelector(`#deck-poke-wrapper-2`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${tempId}">
            <div class="poke-name">${currentPoke.name}</div>
            <img src="${currentPoke.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke2(this.parentNode.id)">X</button>
        </div>
        `)
        deck2.push({pokeId: currentPoke.id, elementId: tempId})
        deck2String = localStorage.deck2 = JSON.stringify(deck2)
    }
}
async function renderDeck1() {
    for (let poke of deck1) {
        const pokeData = await getPokeData(poke.pokeId)
        document.querySelector(`#deck-poke-wrapper-1`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${poke.elementId}">
            <div class="poke-name">${pokeData.name}</div>
            <img src="${pokeData.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke1(this.parentNode.id)">x</button>
        </div>
        `)
    }
}
async function renderDeck2() {
    for (let poke of deck2) {
        const pokeData = await getPokeData(poke.pokeId)
        document.querySelector(`#deck-poke-wrapper-2`).insertAdjacentHTML('beforeend', `
        <div class="poke-wrapper" id="${poke.elementId}">
            <div class="poke-name">${pokeData.name}</div>
            <img src="${pokeData.sprites.back_default}" alt="" class="poke-img">
            <button class="delete-btn" onclick="deletePoke2(this.parentNode.id)">x</button>
        </div>
        `)
    }
}
renderDeck1()
renderDeck2()

function generateID() {
    return new Date().valueOf().toString(36) + Math.random().toString(36).substr(2)
}
function deletePoke1(id) {
    document.getElementById(`${id}`).remove()
    const deck = deck1.filter(poke => poke.elementId !== id)
    deck1 = deck
    deck1String = localStorage.deck1 = JSON.stringify(deck1)
}
function deletePoke2(id) {
    document.getElementById(`${id}`).remove()
    const deck = deck2.filter(poke => poke.elementId !== id)
    deck2 = deck
    deck2String = localStorage.deck2 = JSON.stringify(deck2)
}

