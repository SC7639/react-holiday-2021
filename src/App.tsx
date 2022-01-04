import "./App.css";
import ErrorBoundary from "./error-boundary";
import { Suspense } from "react";
import PokemonDetail from "./pokemon-detail";
import PokemonSearch from "./pokemon-search";

const App = () => {
    return (
        <div className="App">
            <h1>Pokedex memory game</h1>
            <p>
                Test your Poke-memory by guessing which pokemon is next - before
                it appears.
            </p>

            <ErrorBoundary>
                <Suspense fallback="loading pokemon...">
                    <PokemonDetail />
                </Suspense>
                <PokemonSearch />
            </ErrorBoundary>
        </div>
    );
};

export default App;
