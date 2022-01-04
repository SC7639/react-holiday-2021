import sleep from "sleep-promise";
import suspensify from "./util/suspensify";
import fetch from "node-fetch";

export interface PokemonResource {
    id: number;
    name: string;
}
export const fetchPokemon = async (id: number = 1) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = (await res.json()) as PokemonResource;

    console.log("before wait");
    await sleep(2000);
    console.log("after wait");

    return data;
};

export const getPokemon = suspensify(fetchPokemon);
