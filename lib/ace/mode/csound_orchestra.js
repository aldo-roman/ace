import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {CsoundOrchestraHighlightRules} from "./csound_orchestra_highlight_rules";

export var Mode = function() {
    this.HighlightRules = CsoundOrchestraHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/csound_orchestra";
    this.snippetFileId = "ace/snippets/csound_orchestra";
}).call(Mode.prototype);



