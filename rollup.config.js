import typescript from '@rollup/plugin-typescript';
import {string} from "rollup-plugin-string";
// import {terser} from "rollup-plugin-terser";

const formats = ['cjs', 'esm'];
const input = './lib/ace/ace.js';
const dir = './build-rollup';
const plugins = [
    string({
        include: "**/*.(css|snippets)",
    })
]

// TODO bundle files in `ext`, `mode`, `theme` directories

export default {
    input,
    output: {
        dir,
        entryFileNames: `ace.js`,
        format: 'cjs',
        // sourcemap: true
    },
    plugins: [
        string({
            include: "./lib/ace/**/*.(css|snippets)",
        }),
        // does not work! compile tsc in separate step?
        typescript({include: ["./lib/ace/**/*.js", "./lib/ace/**/*.ts"]}),
    ],
};

// export default ['cjs'].flatMap(format => {
//     const target = format === "cjs" ? "es5": "es2015";
//     const extension = format === "cjs" ? "" : ".esm";
//     return [
//         {
//             input,
//             output: {
//                 dir,
//                 entryFileNames: `ace${extension}.js`,
//                 format,
//                 // sourcemap: true
//             },
//             plugins: [
//                 ...plugins,
//                 typescript({target}),
//             ],
//         },
//         // minified
//         // {
//         //     input,
//         //     output: {
//         //         dir',
//         //         entryFileNames: `ace${extension}.min.js`,
//         //         format,
//         //         sourcemap: true
//         //     },
//         //     plugins: [
//         //         ...plugins,
//         //         typescript({target}),
//         //         terser({output: {comments: false}})
//         //     ]
//         // }
//     ];
// })
