import {
    startTransition as reactStartTransition,
    useState,
    useTransition,
} from "react";
import sleep from "sleep-promise";
import suspensify from "./util/suspensify";

export interface PokemonResource {
    id: number;
    name: string;
}

const fetchPokemon = async (id: number = 1) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data: PokemonResource = await res.json();

    await sleep(500);
    return data;
};

const suspenseFetchPokemon = suspensify(fetchPokemon);
const initialPokemon = suspenseFetchPokemon(1);

const PokemonDetail = () => {
    const [pokemonResource, setPokemonResource] = useState(initialPokemon);
    const pokemon = pokemonResource.read();
    const [isPending, startTransition] = useTransition();

    return (
        <article style={{ opacity: isPending ? 0.2 : 1 }}>
            <h2>{pokemon?.name}</h2>
            <button
                onClick={() =>
                    // setPokemonResource(
                    // suspenseFetchPokemon((pokemon?.id || 0) + 1)
                    // )

                    // Wrap the above state update in a transition to see what React does
                    // Instead of flashing no content, it will continue to show the previous view until the next view resolves

                    // reactStartTransition(() =>
                    //     setPokemonResource(
                    //         suspenseFetchPokemon((pokemon?.id || 0) + 1)
                    //     )
                    // )

                    // This option uses useTransition.
                    // useTransition is like startTransition@level2.
                    // instead of returning just the transition function, it returns a tuple.
                    // The first value in that tuple the state of the transition. the second is the same startTransition function
                    startTransition(() =>
                        setPokemonResource(
                            suspenseFetchPokemon((pokemon?.id || 0) + 1)
                        )
                    )
                }
            >
                Next
            </button>
        </article>
    );
};

export default PokemonDetail;
