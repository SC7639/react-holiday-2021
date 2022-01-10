import "./App.css";
import ErrorBoundary from "./error-boundary";
import { FC, lazy, Suspense } from "react";
import PokemonSearch from "./pokemon-search";
import Html from "./Html";

const PokemonDetail = lazy(() => import("./pokemon-detail"));

type Props = {
    assets: { [key: string]: string };
};
const App: FC<Props> = ({ assets }) => {
    return (
        <Html title="React Holidays" assets={assets}>
            <div className="App">
                <h1>Pokedex memory game</h1>
                <p>
                    Test your Poke-memory by guessing which pokemon is next -
                    before it appears.
                </p>

                <ErrorBoundary>
                    <Suspense fallback="loading pokemon...">
                        <PokemonDetail />
                    </Suspense>
                    <PokemonSearch />
                </ErrorBoundary>
            </div>
        </Html>
    );
};

export default App;
