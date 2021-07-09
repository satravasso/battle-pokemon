import axios from "axios";

type pokemon = {
  name: string;
  hp: number,
  attack: number,
  attackName: string,

}

type stat = {
  base_stat: number,
  name: string;
}

function atkPokemon(DefensePokemon: pokemon, AtackPokemon: pokemon) {

  console.log(`${AtackPokemon.name} está atacamdo com ${AtackPokemon.attackName}`)
  const hp = DefensePokemon.hp - AtackPokemon.attack;
  console.log(`${DefensePokemon.name} ficou com com ${hp}`)
  return hp

}
export async function getFightResult(namePokemon1: string, namePokemon2: string) {
  console.log(`Iniciamos nossa batalha Pokemon! E a batalha é ${namePokemon1} contra ${namePokemon2}`)
  let pokemon1 = await getPokemonStats(namePokemon1);
  console.log(`Nosso primeiro Pokemon tem um Ataque de ${pokemon1.attack} e Vida total de ${pokemon1.hp}`)
  let pokemon2 = await getPokemonStats(namePokemon2);
  console.log(`E nosso segundo Pokemon tem um Ataque de ${pokemon2.attack} e Vida total de ${pokemon2.hp}`)

  do {
    console.log(`Começamos com ${namePokemon1} atacando`)
    pokemon2.hp = atkPokemon(pokemon2, pokemon1)
    if (pokemon2.hp >= 0) {
      pokemon1.hp = atkPokemon(pokemon1, pokemon2)
    } else {
      console.log(`${namePokemon2} não sobreviveu ao primeiro ataque! E nosso ganhador é ${namePokemon1}`)
    }
  } while (pokemon1.hp >= 0 && pokemon2.hp >= 0);

  if (pokemon2.hp <= 0) {
    console.log(`>>>>>E o nosso ganhador é ${pokemon1.name}<<<<<<`)
  } else {
    console.log(`>>>>>E o nosso ganhador é ${pokemon2.name}<<<<<<`)
  }

};

async function getPokemonStats(pokemonName: string) {

  let pokemon: pokemon;

  try {

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    const stats = response.data.stats.map((states: any) => { return { base_stat: states.base_stat, name: states.stat.name } });

    pokemon = {
      name: pokemonName,
      hp: stats.find((value: stat) => value.name === 'hp').base_stat,
      attack: stats.find((value: stat) => value.name === 'attack').base_stat,
      attackName: response.data.abilities[0].ability.name

    }
  } catch (error) {
    throw error
  }
  return pokemon;

}
