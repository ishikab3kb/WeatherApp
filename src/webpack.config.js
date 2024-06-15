const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
      new Dotenv({
        path: '.env', // load this now instead of the ones in '.env'
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      })
    ]
  };