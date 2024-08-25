// {
//     "presets": ["react-app"],
//     "plugins": ["@babel/plugin-proposal-private-property-in-object"]
//   }

module.exports = {
  presets: ["react-app"],
  env: {
    production: {
      plugins: ["@babel/plugin-proposal-private-property-in-object"],
    },
  },
};
