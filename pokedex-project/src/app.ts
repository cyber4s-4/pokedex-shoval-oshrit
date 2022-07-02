import { Pokemon, pokemonComponent } from "./pokemonComp";

const api_url = "https://pokeapi.co/api/v2/pokemon?limit=151"

export let pokemons: any[] = [];

// Gets the data from the website.
export async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (let pokemonData of data.results) {
      const pokemonUrl = pokemonData.url;
      const detailes = await fetch(pokemonUrl);
      const pokemon = await detailes.json();
      pokemons.push(pokemon);
    }
  }
  catch (error) {
    console.error(error);
  }
}

// Render the pokemons.
export async function renderIt() {
  await getApi(api_url);
  console.log(pokemons);
  let content: HTMLElement | null = document.querySelector('#content2');
  let pokemons20 = pokemons.filter(pokemon => pokemon.id <= 20 )
  pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
}

function removeAllDivs(){
  const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
  pokemonsDivBeforeSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const pokemonsDivAfterSearch = document.querySelectorAll('.item');
  pokemonsDivAfterSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
}

// Search for some pokemon by name
function search() {
  removeAllDivs();
  const search: HTMLInputElement | null = document.querySelector('.search');
  const value = search?.value.toLowerCase();
  if (value === "") {
    let content: HTMLElement | null = document.querySelector('#content2');
    pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  }
  else if (Number(value)) {
    for (const pokemon of pokemons) {
      if (pokemon.id == Number(value)!) {
        let content: HTMLElement | null = document.querySelector('#content');
        new pokemonComponent(pokemon, content!).renderAfterSearch();
      }
    }
  }
  else {
    for (const pokemon of pokemons) {
      if (pokemon.name.toLowerCase().includes(value!)) {
        let content: HTMLElement | null = document.querySelector('#content');
        new pokemonComponent(pokemon, content!).renderAfterSearch();
      }
    }
  }
}

function pagination(){
  const paginationButtons = document.getElementsByClassName('butttonPagination');
  for(let i=0; i <paginationButtons.length; i++){
    const button = paginationButtons[i] as HTMLElement;
    button.addEventListener('click',()=>{
      for(let j=1;j<9;j++){
        if(button.innerHTML == j.toString()){
          button.style.background = 'rgb(86, 207, 167)';
          removeAllDivs();
          let pokemons20 = pokemons.filter(pokemon => pokemon.id <= j*20 && pokemon.id > j*20-20)
          let content: HTMLElement | null = document.querySelector('#content2');
          pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
        }
      }
      })
   }
}

function backToMainPage(){
  removeAllDivs();
  let content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
}

window.onload = () => {
  renderIt();
  const searchButton = document.getElementsByClassName('searchButton')[0];
  searchButton!.addEventListener('click', search);
  const pokemonList = document.getElementById('mainPage');
  pokemonList!.addEventListener('click', backToMainPage);
  pagination();
}

