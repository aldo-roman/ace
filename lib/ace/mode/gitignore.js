
import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {GitignoreHighlightRules} from "./gitignore_highlight_rules";

export var Mode = function() {
    this.HighlightRules = GitignoreHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/gitignore";
}).call(Mode.prototype);



