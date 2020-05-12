const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function walk(directory, prefix) {
    const files = fs.readdirSync(directory);
    const filepaths = {};
    for (let filename of files) {
        const filepath = path.join(directory, filename);
        if (
            /(ts|js)$/.test(path.extname(filename)) &&
            (
                !filename.includes('test') &&
                !filename.includes('rules') &&
                !filename.includes('worker')
            )
        ) {
            // filepaths.push(filepath);
            filepaths[path.join(prefix, path.basename(filename, '.js'))] = './' + filepath;
        }
    }
    return filepaths;
}

const entry = {
    // ace: './build-tsc/esm-es5-temp/index.js',
    ace: './build-tsc/esm-es5-temp/ace.js',
    'ace.min': './build-tsc/esm-es5-temp/ace.js',
    // ...walk('./build-tsc/esm-es5-temp/ext', 'ext'),
    // ...walk('./build-tsc/esm-es5-temp/keybinding', 'keybinding'),
    // ...walk('./build-tsc/esm-es5-temp/mode', 'mode'),
    // ...walk('./build-tsc/esm-es5-temp/theme', 'theme'),
    // ...walk('./build-tsc/esm-es5-temp/worker', 'worker')
}

module.exports = {
    mode: process.env.NODE_ENV || "development",
    // entry: {
    //     // 'ace': './lib/ace/ace.js',
    //     // 'ace.min': './lib/ace/ace.js',
    //     // 'ext-beautify': './lib/ace/ext/beautify.js'
    //     'theme-textmate': './lib/ace/theme/textmate.js'
    // },
    entry,
    devtool: 'source-map', // process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'build-tsc', 'amd-webpack'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        // library: ["ace", "[name]"],
        library: 'ace',
        // libraryTarget: 'amd',
        // umdNamedDefine: true
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|ts)?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    { loader: 'style-loader', options: { injectType: 'linkTag' } },
                    {
                        loader: 'file-loader',
                        options: {
                            name: function (resourcePath) {
                                const type = path.dirname(resourcePath).split(path.sep).pop();
                                if (['theme', 'ext'].includes(type)) {
                                    return path.join(type, '[name].[ext]');
                                }
                                return '[name].[ext]';
                            },
                            publicPath: '../amd-webpack'
                        }
                    },
                    // 'css-loader'
                ]
            },
            {
                test: /\.snippets$/,
                use: 'raw-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // '.ts'
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    optimization: {
        // splitChunks: {
        //     chunks: 'async'
        // },
        runtimeChunk: 'single',
        // namedChunks: true,
        minimize: true, // process.env.NODE_ENV === 'production',
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                include: /\.min\.js$/,
                extractComments: false,
                terserOptions: {
                    output: {comments: false}
                }
            })
        ],
    }
};