// next.config.js
const withTM = require("next-transpile-modules")(["@hookform/resolvers"]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
});
