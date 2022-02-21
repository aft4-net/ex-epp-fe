module.exports = {
  purge: {
    enabled: true,
    content: [
    './apps/**/*.html',
    './apps/**/*.js',
    './libs/**/*.html',
    './libs/**/*.js'
  ]},
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  // ,