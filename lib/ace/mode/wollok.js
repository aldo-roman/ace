import * as oop from "../lib/oop";
import {Mode as JavaScriptMode} from "./javascript";
import {WollokHighlightRules} from "./wollok_highlight_rules";

export var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = WollokHighlightRules;
};
oop.inherits(Mode, JavaScriptMode);

(function() {
    
    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/wollok";
    this.snippetFileId = "ace/snippets/wollok";
}).call(Mode.prototype);




