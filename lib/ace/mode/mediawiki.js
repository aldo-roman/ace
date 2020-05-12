import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {MediaWikiHighlightRules} from "./mediawiki_highlight_rules";

export var Mode = function() {
    this.HighlightRules = MediaWikiHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    this.blockComment = {start: "<!--", end: "-->"};
    this.$id = "ace/mode/mediawiki";
}).call(Mode.prototype);



