process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const CompressionPlugin = require('compression-webpack-plugin')

// Use Webpack's compatible hash implementation on Node with OpenSSL 3.
const compressible = /\.(js|css|html|json|ico|svg|eot|otf|ttf|map)$/
environment.plugins.append('Compression', new CompressionPlugin({
  filename: '[path][base].gz[query]',
  algorithm: 'gzip',
  test: compressible
}))
if ('brotli' in process.versions) {
  environment.plugins.append('Compression Brotli', new CompressionPlugin({
    filename: '[path][base].br[query]',
    algorithm: 'brotliCompress',
    test: compressible
  }))
}

module.exports = environment.toWebpackConfig()
