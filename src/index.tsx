/// <reference path="global.d.ts" />
import { hydrateRoot } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StrictMode } from "react";
import { PokemonResource } from "./actions";

declare global {
    interface Window {
        assetManifest: { [key: string]: string };
        pokemonData?: PokemonResource;
    }
}

hydrateRoot(
    document,
    <StrictMode>
        <App assets={window.assetManifest} />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
