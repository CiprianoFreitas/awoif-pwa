const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './dist';

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
                },
                {
                    test: /\.html?$/,
                    use: 'file-loader?name=[path][name].[ext]'
                }
            ]
        },
        plugins: isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false // https://github.com/webpack/webpack/issues/1496
                }
            })
        ]
    }];
};