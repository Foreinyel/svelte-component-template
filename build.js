"use strict";

const webpack = require("webpack");
const path = require("path");

const pkg = require("./package.json");

const build = function (mode) {
  return new Promise(function (resolve, reject) {
    const prod = mode === "production";
    const compiler = webpack({
      entry: "./src/index.js",
      resolve: {
        alias: {
          svelte: path.dirname(require.resolve("svelte/package.json")),
        },
        extensions: [".mjs", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"],
      },
      output: {
        path: path.join(__dirname, "/public"),
        filename: prod ? `${pkg.name}.js` : `${pkg.name}.dev.js`,
        libraryTarget: "system",
      },
      module: {
        rules: [
          {
            test: /\.svelte$/,
            use: {
              loader: "svelte-loader",
              options: {
                compilerOptions: {
                  dev: !prod,
                },
                // emitCss: prod,
                // hotReload: !prod,
              },
            },
          },
          {
            test: /\.css$/,
            // use: [MiniCssExtractPlugin.loader, "css-loader"],
            use: ["css-loader"],
          },
          {
            // required to prevent errors from Svelte on Webpack 5+
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      mode,
      plugins: [],
      devtool: prod ? false : "source-map",
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const pack = function () {
  return new Promise(function (resolve, reject) {
    const compiler = webpack({
      entry: "./src/index.js",
      resolve: {
        alias: {
          svelte: path.dirname(require.resolve("svelte/package.json")),
        },
        extensions: [".mjs", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"],
      },
      output: {
        path: path.join(__dirname, "/lib"),
        filename: "index.js",
        libraryTarget: "umd",
      },
      module: {
        rules: [
          {
            test: /\.svelte$/,
            use: {
              loader: "svelte-loader",
              options: {
                compilerOptions: {
                  dev: false,
                },
              },
            },
          },
          {
            test: /\.css$/,
            // use: [MiniCssExtractPlugin.loader, "css-loader"],
            use: ["css-loader"],
          },
          {
            // required to prevent errors from Svelte on Webpack 5+
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      mode: "production",
      plugins: [],
      devtool: false,
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

(async () => {
  await Promise.all([
    ...["production", "development"].map((mode) => build(mode)),
    pack(),
  ]);
})();
