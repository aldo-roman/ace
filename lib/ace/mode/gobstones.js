import * as oop from "../lib/oop";
import {Mode as JavaScriptMode} from "./javascript";
import {GobstonesHighlightRules} from "./gobstones_highlight_rules";

export var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = GobstonesHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function() {
        return null;
    };

    this.$id = "ace/mode/gobstones";
    this.snippetFileId = "ace/snippets/gobstones";
}).call(Mode.prototype);




