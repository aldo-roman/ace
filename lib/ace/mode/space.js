
import * as oop from "../lib/oop";
import {Mode as TextMode} from "./text";
import {FoldMode} from "./folding/coffee";
import {SpaceHighlightRules} from "./space_highlight_rules";

export var Mode = function() {
    // set everything up
    this.HighlightRules = SpaceHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function() {
    
    this.$id = "ace/mode/space";
}).call(Mode.prototype);


