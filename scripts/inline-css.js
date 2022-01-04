const fs = require("fs");
const path = require("path");
const glob = require("glob");

const htmlFile = path.join(__dirname, "../build/index.html");
const indexHtmlContents = fs.readFileSync(htmlFile).toString();
const routePrefix = process.env.ROUTE_PREFIX || "/g";

// Get main css files and concatinate them then add to index.html
glob(
    path.join(__dirname, "../build/static/css/*.chunk.css"),
    (err, matches) => {
        if (err) {
            throw err;
        }

        let newContent = indexHtmlContents;
        let cssContents = "";
        matches.forEach((match) => {
            const filePath = match;
            cssContents += fs.readFileSync(filePath).toString();
            const cssFileName = filePath.split(path.sep).pop();

            // Replace style tag with contents from main css just incase it's run more than once it can replace the contents inside the style sheets

            newContent = newContent.replace(
                `<link href="/${routePrefix}/static/css/${cssFileName}" rel="stylesheet">`,
                "",
            );
        });

        newContent = newContent.replace(
            /\<style id=\"inline-styles-go-here\"\>(.|\n)*\<\/style\>/,
            `<style id="inline-styles-go-here">${cssContents}</style>`,
        );
        fs.writeFileSync(htmlFile, newContent);
        console.log("Inlined css successfully");
    },
);
