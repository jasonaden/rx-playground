const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const rxPaths = require('rxjs/_esm5/path-mapping');

var config = {
    devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
    context: path.resolve('./src'),
    entry: {
        app: './index.ts',
        vendor: './vendor.ts'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        }
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.ts$|\.tsx$/, exclude: ["node_modules"], loader: 'ts-loader' },
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loaders: ['style', 'css'] }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve('./src'), 'node_modules'],
        alias: rxPaths(path.resolve(__dirname, 'node_modules'))
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { // eslint-disable-line quote-props
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            title: 'Typescript Webpack Starter',
            template: '!!ejs-loader!src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: { warnings: false, pure_getters: true, passes: 3, screw_ie8: true, sequences: false },
            output: { comments: false, beautify: true },
            sourceMap: false
        }),
        new DashboardPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};

module.exports = config;
