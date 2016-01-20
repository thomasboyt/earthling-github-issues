/*
 * Custom webpack config that gets merged into default config
 */

import webpack from 'webpack';

export default function generateConfig(environment) {
  // TODO: ensure sass is minified

  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css', 'sass']
        },
        {
          test: /\.(eot|otf|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
}
