const path = require('path')
const resolve = (url) => path.resolve(__dirname, url)

module.exports = {
  webpack: {
    configure: {
      entry: './src/index.tsx'
    },
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@store': resolve('src/store'),
      '@components': resolve('src/components'),
      '@request': resolve('src/request'),
      '@router': resolve('src/router'),
      '@hooks': resolve('src/hooks'),
      '@views': resolve('src/views'),
      '@utils': resolve('src/utils')
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        }
      ]
    }
  }
}
