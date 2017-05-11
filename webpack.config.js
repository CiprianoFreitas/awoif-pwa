const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './dist';
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: {
            modules: false
        },
        entry: {
            'main': './App/boot.tsx'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                include: /App/,
                use: [
                    'awesome-typescript-loader?silent=true'
                ]
            }]
        },
        plugins: [
            new CopyWebpackPlugin(
                [{
                        from: './images',
                        to: './images'
                    },
                    {
                        from: './index.html'
                    },
                    {
                        from: './manifest.json'
                    }
                ]
            )
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false // https://github.com/webpack/webpack/issues/1496
                }
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            })
        ])
    }];
};