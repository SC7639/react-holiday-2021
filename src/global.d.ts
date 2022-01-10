declare global {
    interface Window {
        assetManifest: { [key: string]: string };
        pokemonData?: PokemonResource;
    }
}
