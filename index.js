let { parsers } = require('./parser');
let GlimmerPrinter = require('./printer');

let languages = [
  {
    name: 'Handlebars',
    parsers: ['hbs']
  }
];

module.exports = {
  languages,
  parsers,
  printers: {
    hbs: GlimmerPrinter
  },
  options: {},
  defaultOptions: {
    singleQuote: true,
    tabWidth: 2
  }
};
