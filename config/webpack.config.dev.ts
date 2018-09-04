import * as webpack from 'webpack'
import * as HTMLPlugin from 'html-webpack-plugin'
import { join } from 'path'
import * as merge from 'webpack-merge'

import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

import baseConf from './webpack.config.base'

export default merge(baseConf, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    publicPath: '/public/',
    hot: true,
    overlay: {
      errors: true
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/public/index.html'
        }
      ]
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 2 versions" } } // or whatever your project requires
                ],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "react-hot-loader/babel",
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      template: join(__dirname, '../client/index.html')
    }),
    new HTMLPlugin({
      template: join(__dirname, '../client/server.pug'),
      filename: 'server.pug'
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true
    })
  ]
})
