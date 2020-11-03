const getPokemonInfo = async (pokeId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    const data = await response.json()
    document.querySelector('.poke-colection').insertAdjacentHTML('beforeend',
        `
    <div class="poke-info" id="${pokeId}">
        <div class="poke-name">${data.name}</div>
        <img src="${data.sprites.back_default}" alt="" class="poke-img">
        <button>delete</button>
    </div>
    `
    )
}
let pokeIds = []
if(localStorage.pokeIds) {
    pokeIds = JSON.parse(localStorage.pokeIds)
}
function loadPokemon() {
    document.querySelector('.poke-colection').innerHTML = ''
    for (let i = 0; i < pokeIds.length; i++) {
        getPokemonInfo(pokeIds[i])
    }
}
loadPokemon()
const form = document.querySelector('#search-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const pokeId = form.input.value
    pokeIds.push(pokeId)
    localStorage.pokeIds = JSON.stringify(pokeIds)
    getPokemonInfo(pokeId)
})
