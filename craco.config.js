const path = require('path');
const CracoAntDesignPlugin = require("craco-antd");

const resolve = (dir) => path.join(__dirname, '.', dir);
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = {
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ]
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                cssLoaderOptions: {
                    modules: {
                        getLocalIdent: (context, localIdentName, localName, options) => {
                            if (context.resourcePath.includes('node_modules')) {
                                return localName;
                            }
                            return getCSSModuleLocalIdent(context, localIdentName, localName, options);
                        }
                    }
                },
                // customizeTheme: {
                //     '@primary-color': '#fe8f24'
                // },
                customizeThemeLessPath: path.join(__dirname, 'src/styles/theme.less'),
                babelPluginImportOptions: {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true
                },
            }
        },
    ],
    webpack: {
        alias: {
            '@': resolve('src'),
        },
    },
    devServer: (devServerConfig, { proxy }) => {
        devServerConfig.proxy = {
            ...proxy,
            '/api': {
                // 访问 localhost:3000/api/* 相当于访问 localhost:3001/api/*
                target: 'localhost:3001',
                changeOrigin: true,
            },
        }
        return devServerConfig
    },
};