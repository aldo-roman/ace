import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {CsoundScoreHighlightRules} from "./csound_score_highlight_rules";

export var Mode = function() {
    this.HighlightRules = CsoundScoreHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/csound_score";
}).call(Mode.prototype);



