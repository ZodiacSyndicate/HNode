import { join } from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  target: 'node',
  mode: 'production',
  entry: {
    app: join(__dirname, '../client/server-entry.tsx'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': join(__dirname, '../client')
    }
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/public/',
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          join(__dirname, '../server'),
          join(__dirname, '../node_modules')
        ],
        use: 'ts-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              name: '[name].[ext]?[hash]',
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 65,
                progressive: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:3333/api"'
    })
  ]
}

export default config
