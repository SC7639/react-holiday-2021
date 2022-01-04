import {
    startTransition as reactStartTransition,
    useState,
    useTransition,
} from "react";
import { PokemonResource, getPokemon } from "./actions";
import NextPokemonButton from "./next-pokemon-btn";
import { SuspensifyReturn } from "./util/suspensify";

const initialPokemon = getPokemon(1);

const PokemonDetail = () => {
    const [pokemonResource, setPokemonResource] = useState(initialPokemon);
    const pokemon = pokemonResource.read();
    const [isPending, startTransition] = useTransition();
    const setPokemon = (resource: SuspensifyReturn<PokemonResource>) =>
        startTransition(() => setPokemonResource(resource));

    return (
        <article style={{ opacity: isPending ? 0.2 : 1 }}>
            <h2>{pokemon?.name}</h2>
            <NextPokemonButton
                // id={pokemon?.id || 0}
                // setPokemonResource={setPokemonResource}
                // startTransition={startTransition}
                // setPokemon={setPokemon}
                onClick={() => setPokemon(getPokemon((pokemon?.id || 0) + 1))}
            />
        </article>
    );
};

export default PokemonDetail;
