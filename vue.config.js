const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
const title = '星云控制台';

process.env.VUE_APP_TITLE = title || 'vue3.x-antd-admin';
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const isProd = process.env.NODE_ENV !== 'development';

module.exports = {
  configureWebpack (config) {
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    if (isProd) {
      Object.assign(config.output, {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js'
      });
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: true // 删除原文件
        })
      );
    }

    config.plugins.push(
      // 定义全局引入的变量
      new webpack.ProvidePlugin({
        moment: require('moment')
      }),
      new WebpackBar({
        name: 'server'
      })
    );

    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve('')
        }
      }
    };
  },
  chainWebpack (config) {
    config.resolve.symlinks(true);

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map');
    });

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false);
      config.devtool('none');
      // config.optimization.splitChunks({
      //   chunks: 'all',
      //   cacheGroups: {
      //     libs: {
      //       name: 'vue3.x-antd-admin',
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: 10,
      //       chunks: 'initial'
      //     }
      //   }
      // });
    });
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        // do not remove this line
        javascriptEnabled: true
      }
    }
  }
};
