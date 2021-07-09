import { getFightResult } from "./FightPokemon/service/pokemon-api";

async function battlePokemon() {

  const winner = await getFightResult('pikachu', 'ditto');
  console.log(`>>>>>E o nosso ganhador é ${winner.toUpperCase()}<<<<<<`)
}

battlePokemon();