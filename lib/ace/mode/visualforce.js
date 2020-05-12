/* caption: Visualforce; extensions: component,page,vfp */

import * as oop from "../lib/oop";
import {Mode as HtmlMode} from "./html";
import {VisualforceHighlightRules} from "./visualforce_highlight_rules";
import {XmlBehaviour} from "./behaviour/xml";
import {FoldMode as HtmlFoldMode} from "./folding/html";

export var Mode = function VisualforceMode() {
    HtmlMode.call(this);

    this.HighlightRules = VisualforceHighlightRules;
    this.foldingRules = new HtmlFoldMode();
    this.$behaviour = new XmlBehaviour();
}

oop.inherits(VisualforceMode, HtmlMode);

VisualforceMode.prototype.emmetConfig = {
    profile: "xhtml"
};

