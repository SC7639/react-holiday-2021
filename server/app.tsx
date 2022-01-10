import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import express from "express";
import expressStaticGzip, {
    ExpressStaticGzipOptions,
} from "express-static-gzip";
import path from "path";
import { getPokemon, PokemonResource } from "../src/actions";
import { DataProvider } from "../src/data-prodiver";
import { files } from "../build/asset-manifest.json";

declare global {
    interface Window {
        assetManifest: { [key: string]: string };
        pokemonData?: PokemonResource;
    }
}

const publicFolder = "build";
const PORT = process.env.PORT || 3000;
const TIME_OUT = 10000;
const JS_BUNDLE_DELAY = 0;

const app = express();

app.use((req, res, next) => {
    if (req.url.endsWith(".js")) {
        // Artificially delay serving JS
        // to demonstrate streaming HTML.
        setTimeout(next, JS_BUNDLE_DELAY);
    } else {
        next();
    }
});

const staticOptions: ExpressStaticGzipOptions = {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    serveStatic: {
        maxAge: "1y",
    },
};

app.use(
    "/static/css/",
    expressStaticGzip(
        path.join(__dirname, `../${publicFolder}/static/css/`),
        staticOptions
    )
);
app.use(
    "/static/js/",
    expressStaticGzip(
        path.join(__dirname, `../${publicFolder}/static/js/`),
        staticOptions
    )
);

app.get("/", (req, res) => {
    let didError = false;

    res.socket?.on("error", (err) => {
        console.log("Fatal", err);
    });

    const initialPokemon = getPokemon(1);
    const { pipe, abort } = renderToPipeableStream(
        <DataProvider data={initialPokemon}>
            <App assets={files} />
        </DataProvider>,
        {
            bootstrapScripts: [files["main.js"]],
            onCompleteShell() {
                // If something errored before we started streaming, set the status code appropriately
                res.statusCode = didError ? 500 : 200;
                res.setHeader("Content-Type", "text/html");

                pipe(res);
            },
            onError(err) {
                didError = true;
                console.error(err);
            },
        }
    );

    setTimeout(abort, TIME_OUT);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
