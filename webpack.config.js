const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        "bundle": "./src/index.js"
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        library: '@nullunit/react-gtm',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread','@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true
    },
    externals: {
        // Use external version of React
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react'
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM"
        },
        "prop-types": {
            root: "prop-types",
            commonjs: "prop-types",
            commonjs2: "prop-types",
            amd: "prop-types"
        }
    }
};
