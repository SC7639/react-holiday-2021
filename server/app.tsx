import { readFileSync } from "fs";
import http from "http";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";

const publicFolder = "build";
const PORT = process.env.PORT || 3000;
const TIME_OUT = 10000;

const html = readFileSync(`${__dirname}/../${publicFolder}/index.html`)
    .toString()
    .split(`<div id="root">`);

const server = http.createServer((req, res) => {
    let didError = false;

    res.socket?.on("error", (err) => {
        console.log("Fatal", err);
    });

    console.log("reqest");

    const { pipe, abort } = renderToPipeableStream(<App />, {
        onCompleteShell() {
            // If something errored before we started streaming, set the status code appropriately
            res.statusCode = didError ? 500 : 200;
            res.setHeader("Content-Type", "text/html");

            // html before react dom contents
            res.write(html[0]);
            res.write(`<div id="root">`);

            pipe(res);

            // html after dom contents
            res.write("</div>");
            res.end(html[1]);
            console.log("sent");
        },
        onError(err) {
            didError = true;
            console.error(err);
        },
    });

    setTimeout(abort, TIME_OUT);
});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
