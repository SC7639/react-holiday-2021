import {
    startTransition as reactStartTransition,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import { PokemonResource, getPokemon } from "./actions";
import { DataContext, SuspensePokemonResource } from "./data-prodiver";
import NextPokemonButton from "./next-pokemon-btn";
import suspensify, { SuspensifyReturn } from "./util/suspensify";

// Get pokemon data from dom that was loaded by ssr
let pokemonData: SuspensePokemonResource | undefined;
if (typeof window !== "undefined" && window && window.pokemonData) {
    pokemonData = suspensify(
        async () => window.pokemonData as PokemonResource
    )();
}

const PokemonDetail = () => {
    const initialPokemon = useContext(DataContext);
    const [pokemonResource, setPokemonResource] = useState(() => {
        if (initialPokemon) {
            return initialPokemon;
        }

        if (pokemonData) {
            return pokemonData;
        }
    });
    const pokemon = pokemonResource?.read();
    const [isPending, startTransition] = useTransition();
    const setPokemon = (resource: SuspensifyReturn<PokemonResource>) =>
        startTransition(() => setPokemonResource(resource));

    useEffect(() => {
        if (!pokemonResource) {
            setPokemonResource(getPokemon(1));
        }
    }, []);

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

            {/* Pass data to the dom for re-hydration */}
            {initialPokemon && typeof window === "undefined" && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `pokemonData = ${JSON.stringify(pokemon)};`,
                    }}
                />
            )}
        </article>
    );
};

export default PokemonDetail;
