// Runs this script only once and it save the data in the data folder.// const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

// const axios = require ("axios")
// const pokemons = []; 
// async function getData(){
//    const dataPokemonsUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
//     const data = dataPokemonsUrl.data;
//     for (const pokemonData of data.results) {
//       const pokemonUrl = pokemonData.url;
//       const detailes =await axios.get(pokemonUrl);
//       const pokemon = detailes.data;
//       pokemons.push(pokemon);
//     }
//     fs.writeFileSync("../data/data.json", JSON.stringify(pokemons));
// }

const express = require('express');
const path = require("path");
const app =express();
const fs = require("fs");
let favorites=[];
filePath = path.join(__dirname,'../../data/data.json');
let readFileData = JSON.parse(fs.readFileSync(filePath,"utf8"))


app.use('/', express.static(path.resolve('../dist/client')));
app.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('../dist/client/index.html'))
});

app.get('/pokemonsData',(req,res)=>{
  res.send(readFileData)
})
app.post('/favoritePokemons',(req,res)=>{
console.log(req.body);
  let favoritePokemon = req.body;
  readFileData.push(favorites);
})
app.get('/favoritePokemons',(req,res)=>{
  res.send(pokemons)
})
app.listen(5000,()=>{
  console.log("listen to port 5000");
})






