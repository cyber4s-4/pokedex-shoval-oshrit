import { pokemonComponent } from './pokemonComp';
import { popup } from './popUp';
import { addToFavorite } from './favorite'
import {  search } from './search';

export let pokemons: any[] = [];
export const favoriteList :any[]=[];
export let favorites:any[]=[];

// Gets the data from the website.
export async function getApi() {
  try {
    const pokemonsData = await fetch('/pokemonsData0');
    await pokemonsData.json().then(res =>pokemons =res)
  } catch (error) {
    console.error(error);
  }
}

// Render the pokemons.
export async function renderIt() {
  await getApi();
  const content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  const divsAfterSearch = document.querySelectorAll('.img');
  for (let i = 0; i < divsAfterSearch.length; i++) {
    const divAfterSearch = divsAfterSearch[i];
    divAfterSearch.addEventListener('click', popup);
  }
  const favoriteButton = document.querySelectorAll('.fa.fa-star');
  for (let i = 0; i < favoriteButton.length; i++) {
    const favorite = favoriteButton[i];
    favorite.addEventListener('click', addToFavorite);
  }
  await getFavorite();
  for (const pokemon of pokemons){
    for (const favorite of favorites){
      if (pokemon.id == favorite.id){
        const starImages = document.querySelectorAll('.starImage');
        for (let j=0;j <starImages.length;j++){
          const starImage = starImages[j] as HTMLElement;
          if (starImage!.id == pokemon.id){
                starImage!.style.opacity = '1';
          }
        }
      }
    }
  }
}

// Search for some pokemon by name
export async function pagination() {
  const paginationButtons = document.getElementsByClassName('butttonPagination');
  for (let i = 0; i < paginationButtons.length; i++) {
    const button = paginationButtons[i] as HTMLButtonElement;
    button.style.background = '#ddd';
    button.addEventListener('click', async () => {
      const number = Number(button.innerHTML);
      try {
        const pokemonsData = await fetch(`/pokemonsData${number*40-40}`);
        await pokemonsData.json().then(res =>pokemons =res)
      } catch (error) {
        console.error(error);
      }
      removeAllDivs();
      const content: HTMLElement | null = document.querySelector('#content2');
      pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
      pagination();
      button.style.background = 'rgb(86, 207, 167)';
      const itemDivs = document.querySelectorAll('.img');
      for (let i = 0; i < itemDivs.length; i++) {
        const itemDiv = itemDivs[i];
        itemDiv.addEventListener('click', popup);
      }
    });
  }
  const favoriteButton = document.querySelectorAll('.fa.fa-star');
  for (let i = 0; i < favoriteButton.length; i++) {
    const favorite = favoriteButton[i];
    favorite.addEventListener('click', addToFavorite);
  }
  await getFavorite();
  for (const pokemon of pokemons){
    for (const favorite of favorites){
      if (pokemon.id == favorite.id){
        const starImages = document.querySelectorAll('.starImage');
        for (let j=0;j <starImages.length;j++){
          const starImage = starImages[j] as HTMLElement;
          if (starImage!.id == pokemon.id){
                starImage!.style.opacity = '1';
          }
        }
      }
    }
  }
}

export async function getFavorite(){
  try {
    const pokemonsData = await fetch('/favoriteList');
    await pokemonsData.json().then(res =>favorites =res)
  } catch (error) {
    console.error(error);
  }
}

async function renderFavorites(){
  await getFavorite();
  removeAllDivs();
  const content: HTMLElement | null = document.querySelector('#content');
  favorites.forEach(pokemon => new pokemonComponent(pokemon, content!).renderAfterSearch());
  for (const favorite of favorites){
    const starImages = document.querySelectorAll('.starImage');
    for (let j=0;j <starImages.length;j++){
      const starImage = starImages[j] as HTMLElement;
      if (starImage!.id == favorite.id){
            starImage!.style.opacity = '1';
      }
    }
  }
}

// Removes all the elements.
export function removeAllDivs() {
  const message: HTMLElement | null = document.querySelector('#content3');
  message!.style.display = 'none';
  const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
  pokemonsDivBeforeSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const pokemonsDivAfterSearch = document.querySelectorAll('.item');
  pokemonsDivAfterSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
}

// Renders all the pokemons.
async function backToMainPage() {
  removeAllDivs();
  const content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  const itemDivs = document.querySelectorAll('.img');
  for (let i = 0; i < itemDivs.length; i++) {
    const itemDiv = itemDivs[i];
    itemDiv.addEventListener('click', popup);
  }
  getFavorite();
  for (const pokemon of pokemons){
    for (const favorite of favorites){
      if (pokemon.id == favorite.id){
        const starImages = document.querySelectorAll('.starImage');
        for (let j=0;j <starImages.length;j++){
          const starImage = starImages[j] as HTMLElement;
          if (starImage!.id == pokemon.id){
                starImage!.style.opacity = '1';
          }
        }
      }
    }
  }

  const favoriteButton = document.querySelectorAll('.fa.fa-star');
  for (let i = 0; i < favoriteButton.length; i++) {
    const favorite = favoriteButton[i];
    favorite.addEventListener('click', addToFavorite);
  }
}

window.onload = () => {
  renderIt();
  const searchButton = document.getElementsByClassName('searchButton')[0];
  searchButton!.addEventListener('click', search);
  const pokemonList = document.getElementById('mainPage');
  pokemonList!.addEventListener('click', backToMainPage);
  const favoriteList = document.getElementById('favoriteList');
  favoriteList!.addEventListener('click', renderFavorites);
  pagination();
  const paginationFirstButton = document.getElementsByClassName('butttonPagination')[1] as HTMLElement;
  paginationFirstButton.style.background = 'rgb(86, 207, 167)';
};