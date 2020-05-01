const { GenerateSW } = require("workbox-webpack-plugin");
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxOptions: {
      debug: true,
      cacheNamePrefix: 'customCacheName'
    }
  },
  publicPath: process.env.NODE_ENV === "development" ? "/algorithms-pwa/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};
