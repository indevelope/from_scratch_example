module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-custom-media')({
      importFrom: {
        customMedia: {
          '--phone': '(max-width: 541px)'
        }
      }
    })
  ]
};