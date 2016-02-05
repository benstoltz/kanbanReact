const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

process.env.BABEl_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                // takes either a path or array of paths
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                // Enable caching for imp perform during dev
                // uses default OS directory by default
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history api fallback so HTML5 hist api based routing works
            // Good default
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce amount of output.
            stats: 'errors-only',

            // Parse host and port from env so easy to custom
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}