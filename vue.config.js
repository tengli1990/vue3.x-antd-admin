const path = require('path');
const {
  /* baseURL, */
  title,
  devPort
} = require('./src/config');

process.env.VUE_APP_TITLE = title || 'vue-admin-beautiful';
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const mockServer = () => {
  if (process.env.NODE_ENV === 'development') {
    // return require('./mock/mockServer.js');
  } else {
    return '';
  }
};

module.exports = {
  // publicPath,
  // assetsDir,
  // outputDir,
  // lintOnSave,
  // transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^/" + baseURL]: "",
    //     },
    //   },
    // },
    after: mockServer()
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve('')
        }
      },
      plugins: [
        // new Webpack.ProvidePlugin(providePlugin),
        // new WebpackBar({
        //   name: webpackBarName
        // })
      ]
    };
  },
  chainWebpack (config) {
    config.resolve.symlinks(true);
    config.module.rule('svg').exclude.add(resolve('src/icon/remixIcon')).end();

    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icon/remixIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'remix-icon-[name]' })
      .end();

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map');
    });

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false);
      config.devtool('none');
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'vue-admin-beautiful-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          }
        }
      });
      config
        // .plugin('banner')
        // .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
        .end();
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end();
    });

    // if (build7z) {
    //   config.when(process.env.NODE_ENV === 'production', (config) => {
    //     config
    //       .plugin('fileManager')
    //       .use(FileManagerPlugin, [
    //         {
    //           onEnd: {
    //             delete: [`./${outputDir}/video`, `./${outputDir}/data`],
    //             archive: [
    //               {
    //                 source: `./${outputDir}`,
    //                 destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`
    //               }
    //             ]
    //           }
    //         }
    //       ])
    //       .end();
    //   });
    // }
  },
  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#108EE9',
          // 'success-color': '#3DBD7D',
          // 'error-color': '#F56A00',
          // 'warning-color': '#FFBF00',
          // 'link-color': '#1794EE',
          'border-radius-base': '2px'
          // 'component-background': '#44596B',
          // 'text-color': '#fff'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  }
};
