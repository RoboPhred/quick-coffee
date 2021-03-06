const { join: joinPath, resolve: resolvePath } = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");

const PATHS = {
  src: resolvePath("./src"),
  assets: resolvePath("./assets"),
  dist: resolvePath("./dist")
};
const PUBLIC_URL = "/";

const isProd = process.env.NODE_ENV === "production";

const COFFEE_ENDPOINT =
  process.env.COFFEE_ENDPOINT || isProd
    ? "http://coffee-endpoint-url-insert-here"
    : "http://localhost:4000";

module.exports = {
  mode: isProd ? "production" : "development",

  devtool: "source-map",

  entry: {
    client: [joinPath(PATHS.src, "./index.tsx")]
  },

  output: {
    filename: "[name].[hash].bundle.js",
    path: PATHS.dist,
    publicPath: PUBLIC_URL
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": PATHS.src,
      "@assets": PATHS.assets
    }
  },

  module: {
    rules: [
      // Process source maps in input sources
      //  All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      },

      // Compile typescript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },

      // css
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: isProd ? true : false
            }
          }
        ]
      },

      // fonts
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[hash].[ext]"
          }
        }
      },

      // SVG
      {
        test: /\.svg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[hash].[ext]"
          }
        }
      }
    ]
  },

  plugins: [
    !isProd && new webpack.NamedModulesPlugin(),
    !isProd && new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        COFFEE_ENDPOINT: JSON.stringify(COFFEE_ENDPOINT)
      }
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: resolvePath(PATHS.src, "index.ejs")
    }),

    isProd &&
      new UglifyJsWebpackPlugin({
        sourceMap: true
      })
  ].filter(truthy),

  devServer: {
    // Tell the dev server to return the entrypoint for any
    //  sub-path, since we use url routes.
    historyApiFallback: true
  }
};

function truthy(x) {
  return !!x;
}
