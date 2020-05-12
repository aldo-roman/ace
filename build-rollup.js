const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const {string} = require('rollup-plugin-string');
const postcss = require('rollup-plugin-postcss');
const html = require('@rollup/plugin-html');

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
            filepaths[`${prefix}-${filename.replace(/\.js$/, '')}`] = filepath;
        }
    }
    return filepaths;
}

// const input = walk('./build-tsc/esm-es5-temp/ext', 'ext')

// TODO invoke tsc-esm-es5, copy assets and then clean

// see below for details on the options
const buildInput = (input) => ({
    // // core input options
    // external: (id, importer, isResolved) => {
    //
    //     // TODO whitelist instead of blacklist?
    //
    //     if (id.includes('autocomplete')) {
    //         return false;
    //     }
    //
    //     if (importer.includes('options') && (id.includes('modelist') || id.includes('themelist'))) {
    //         return false;
    //     }
    //
    //     if (importer.includes('settings_menu') && id.includes('options')) {
    //         return false;
    //     }
    //
    //     if (id.includes('snippets')) {
    //         return false;
    //     }
    //
    //     if (id.includes('menu_tools')) {
    //         return false;
    //     }
    //
    //     // TODO: css loader? (strip comments, minimize)
    //     if (/\.(css|snippet)$/.test(id)) {
    //         return false;
    //     }
    //
    //     // console.log(id, importer)
    //
    //     return true;
    // },
    input, // required
    plugins: [
        string({
            include: "**/*.(snippets)", // css|
        }),
        postcss({
            extract: true,
            // modules: true
        }),
        html({
            template: ({ attributes, files, meta, publicPath, title }) => {
                const makeHtmlAttributes = (attributes) => {
                    if (!attributes) {
                        return '';
                    }

                    const keys = Object.keys(attributes);
                    // eslint-disable-next-line no-param-reassign
                    return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
                };

                const scripts = (files.js || [])
                    .filter(({ fileName }) => !fileName.includes('theme'))
                    .map(({ fileName }) => {
                        const attrs = makeHtmlAttributes(attributes.script);
                        return `<script src="${publicPath}${fileName}"${attrs}></script>`;
                    })
                    .join('\n');

                const links = (files.css || [])
                    .map(({ fileName }) => {
                        const attrs = makeHtmlAttributes(attributes.link);
                        return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
                    })
                    .join('\n');

                return `<!doctype html>
<html>
  <head>
    ${links}
<!--    <script data-main="ace" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>-->
  </head>
  <body>
    <div id="editor"></div>
    ${scripts}
    <script>ace.editor('editor')</script>
  </body>
</html>`;
            }})
    ],
    //
    // // advanced input options
    // cache,
    // inlineDynamicImports,
    // manualChunks,
    // onwarn,
    // preserveModules,
    // strictDeprecations,
    //
    // // danger zone
    // acorn,
    // acornInjectPlugins,
    // context,
    // moduleContext,
    // preserveSymlinks,
    // shimMissingExports,
    // treeshake,
    //
    // // experimental
    // experimentalCacheExpiry,
    // perf
});

const buildOutput = (moduleId, type) => ({
    // // core output options
    dir: './build-tsc/amd',
    // file,
    format: 'amd', // required
    // globals,
    // name,
    // plugins
    //
    // // advanced output options
    // assetFileNames,
    // banner,
    chunkFileNames: `chunks/[name]-[hash].js`,
    // compact,
    // entryFileNames: `${type}-[name].js`,
    // extend,
    // externalLiveBindings,
    // footer,
    // hoistTransitiveImports,
    // interop,
    // intro,
    // outro,
    // paths,
    // sourcemap,
    // sourcemapExcludeSources,
    // sourcemapFile,
    // sourcemapPathTransform,
    //
    // // danger zone
    // amd: {
    //     id: `ace/${type}/${moduleId}`
    // },
    // esModule,
    // exports,
    // freeze,
    // indent,
    // namespaceToStringTag,
    // noConflict,
    // preferConst,
    // strict
});

async function build(input) {
    // create a bundle
    const bundle = await rollup.rollup(buildInput(input));

    // console.log(bundle.watchFiles); // an array of file names this bundle depends on

    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // const {output} = await bundle.generate(outputOptions);

    // for (const chunkOrAsset of output) {
    //     if (chunkOrAsset.type === 'asset') {
    //         // For assets, this contains
    //         // {
    //         //   fileName: string,              // the asset file name
    //         //   source: string | Uint8Array    // the asset source
    //         //   type: 'asset'                  // signifies that this is an asset
    //         // }
    //         console.log('Asset', chunkOrAsset);
    //     } else {
    //         // For chunks, this contains
    //         // {
    //         //   code: string,                  // the generated JS code
    //         //   dynamicImports: string[],      // external modules imported dynamically by the chunk
    //         //   exports: string[],             // exported variable names
    //         //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
    //         //   fileName: string,              // the chunk file name
    //         //   imports: string[],             // external modules imported statically by the chunk
    //         //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
    //         //   isEntry: boolean,              // is this chunk a static entry point
    //         //   map: string | null,            // sourcemaps if present
    //         //   modules: {                     // information about the modules in this chunk
    //         //     [id: string]: {
    //         //       renderedExports: string[]; // exported variable names that were included
    //         //       removedExports: string[];  // exported variable names that were removed
    //         //       renderedLength: number;    // the length of the remaining code in this module
    //         //       originalLength: number;    // the original length of the code in this module
    //         //     };
    //         //   },
    //         //   name: string                   // the name of this chunk as used in naming patterns
    //         //   type: 'chunk',                 // signifies that this is a chunk
    //         // }
    //         console.log('Chunk', chunkOrAsset);
    //     }
    // }

    // or write the bundle to disk
    await bundle.write(buildOutput());
}

// const directories = [];

// const input = walk('./build-tsc/esm-es5-temp/ext')

// input.forEach(i => {
//
//     // const moduleId = i.replace(/\.(js|ts)$/, '');
//     const [, type, moduleId] = i.match(/^build-tsc\/esm-es5-temp\/(.*)\/(.*)\.(js|ts)$/);
//     console.log(type, moduleId);
//
//     build(
//         buildInput(i),
//         buildOutput(moduleId, type)
//     )
// });

build({
    ace: './lib/ace/ace.js',
    ...walk('./build-tsc/esm-es5-temp/ext', 'ext'),
    // ...walk('./build-tsc/esm-es5-temp/keybinding', 'keybinding'),
    ...walk('./build-tsc/esm-es5-temp/mode', 'mode'),
    ...walk('./build-tsc/esm-es5-temp/theme', 'theme'),
    // ...walk('./build-tsc/esm-es5-temp/worker', 'worker')
});

// build(
//     fs.readdirSync('./build-tsc/esm-es5-temp/mode')
//         .filter(filename => filename.includes('worker'))
//         .map(filename => path.join('./build-tsc/esm-es5-temp/mode', filename))
// )

// build({
//     ace: './build-tsc/esm-es5-temp/ace.js',
//     'theme-textmate': './lib/ace/theme/textmate.js'
// })