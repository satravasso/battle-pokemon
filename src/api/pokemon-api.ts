import axios from "axios";

export async function getMarsWeather() {

  try {
    const response = axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};
