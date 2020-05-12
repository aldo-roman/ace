import * as oop from "../lib/oop";
import {Mode as JavaScriptMode} from "./javascript";
import {GroovyHighlightRules} from "./groovy_highlight_rules";

export var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = GroovyHighlightRules;
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/groovy";
}).call(Mode.prototype);



