import * as HTMLWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import * as merge from 'webpack-merge'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import baseConf from './webpack.config.base'

export default merge(baseConf, {
  mode: 'production',
  output: {
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          join(__dirname, '../server'),
          join(__dirname, '../node_modules')
        ],
        use: 'ts-loader'
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: '[name].manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors'
        },
        asyncVendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          minChunks: 2,
          name: 'async-vendors'
        }
      }
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: join(__dirname, '../client/index.html')
    }),
    new HTMLWebpackPlugin({
      template: join(__dirname, '../client/server.pug'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 9999,
      openAnalyzer: true,
      logLevel: 'info',
      generateStatsFile: false
    }),
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: join(__dirname, '../'),
        verbose: true,
        dry: false,
      }
    )
  ]
})
