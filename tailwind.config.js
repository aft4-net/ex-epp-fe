module.exports = {
  mode:'jit',
 purge: {
  enabled: process.env.NODE_ENV === 'production',
  content: [
  './apps/**/src/**/*.html'
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