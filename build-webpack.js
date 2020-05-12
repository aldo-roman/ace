const path = require('path');
const webpack = require('webpack');
const findImports = require('find-imports');

const compiler = () => {

    // const file = './lib/ace/theme/textmate.js';

    const entry = {
        ace: './lib/ace/ace.js',
        // ...walk('./build-tsc/esm-es5-temp/ext', 'ext'),
        // ...walk('./build-tsc/esm-es5-temp/keybinding', 'keybinding'),
        // ...walk('./build-tsc/esm-es5-temp/mode', 'mode'),
        // ...walk('./build-tsc/esm-es5-temp/theme', 'theme'),
        // ...walk('./build-tsc/esm-es5-temp/worker', 'worker')
    }

    // const moduleId = file.replace(/^.*ace/, 'ace').replace(/\..+$/, '');
    // const outputId = file.replace(/^.*ace\//, '').replace('/', '-');
    const externals = findImports(file, {absoluteImports: true, relativeImports: true, flatten: true});

    return webpack({
        mode: process.env.NODE_ENV || "development",
        entry, // : file,
        devtool: 'none', // process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
        output: {
            path: path.resolve(__dirname, 'build-tsc', 'amd-webpack'),
            // filename: outputId,
            // library: moduleId,
            libraryTarget: 'amd',
        },
        // externals,
        optimization: {
            minimize: false
        }
    });
};

// to watch, see https://webpack.js.org/api/node/#watching

compiler().run((err, stats) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
    }));
})