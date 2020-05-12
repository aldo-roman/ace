import * as oop from "../lib/oop";
import {Mode as JavaScriptMode} from "./javascript";
import {JavaHighlightRules} from "./java_highlight_rules";
import {FoldMode as JavaFoldMode} from "./folding/java";

export var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = JavaHighlightRules;
    this.foldingRules = new JavaFoldMode();
};
oop.inherits(Mode, JavaScriptMode);

(function() {
    
    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/java";
    this.snippetFileId = "ace/snippets/java";
}).call(Mode.prototype);



