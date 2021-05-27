// const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    // {
    //   plugin: CracoAntDesignPlugin,
    //   options: {
    //     customizeTheme: {
    //       '@primary-color': '#ec717d',
    //     },
    //   },
    // },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#ec717d' },
            javascriptEnabled: true,
          },
        },
      },
    }
  ],
};