import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {CsoundDocumentHighlightRules} from "./csound_document_highlight_rules";

export var Mode = function() {
    this.HighlightRules = CsoundDocumentHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/csound_document";
    this.snippetFileId = "ace/snippets/csound_document";
}).call(Mode.prototype);



