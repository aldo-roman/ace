// if (typeof process !== "undefined") {
//     $__amd_loader;
// }
//
// import $__amd_loader from "amd-loader";
// import $_____test_mockdom from "../test/mockdom";
import {Mode} from "../mode/html";
import * as ace from "../ace";
import assert from "assert";
import "./emmet";
import asyncjs from "asyncjs";

module.exports = {
    "test doesn't break tab when emmet is not loaded": function() {
        var editor = ace.edit(null, {
            mode: new Mode(),
            enableEmmet: true,
            useSoftTabs: false
        });
        
        window.emmet = null;
        editor.onCommandKey({}, 0, 9);
        assert.equal(editor.getValue(), "\t");
        
        try {
            var called = 0;
            window.emmet = {
                actions: {
                    run: function() {
                        called++;
                    }
                },
                resources: {
                    setVariable: function() {
                        called++;
                    }
                }
            };
            editor.onCommandKey({}, 0, 9);
            assert.equal(called, 2);
        } finally {
            window.emmet = null;
        }
    }
};



if (typeof module !== "undefined" && module === require.main) {
    asyncjs.test.testcase(module.exports).exec();
}
