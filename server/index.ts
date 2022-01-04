const nodeEnv = process.env.NODE_ENV || "production";

// If running in development compile code with babel
if (nodeEnv === "development") {
    require("@babel/register")({
        extensions: [".js", ".ts", ".tsx"],
        configFile: `${__dirname}/.babelrc`,
    });
}

require("./app");
