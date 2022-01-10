import { FC } from "react";

type Props = {
    assets: { [key: string]: string };
    title: string;
};

const Html: FC<Props> = ({ assets, children, title }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="favicon.ico" />
            <link rel="stylesheet" href={assets["main.css"]} />
            <title>{title}</title>
        </head>
        <body>
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<b>Enable JavaScript to run this app.</b>`,
                }}
            />
            {children}
            <script
                dangerouslySetInnerHTML={{
                    __html: `assetManifest = ${JSON.stringify(assets)};`,
                }}
            />
        </body>
    </html>
);

export default Html;
