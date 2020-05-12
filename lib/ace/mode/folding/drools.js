import * as oop from "../../lib/oop";
import {Range} from "../../range";
import {FoldMode as BaseFoldMode} from "./fold_mode";
import {TokenIterator} from "../../token_iterator";

export var FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    // regular expressions that identify starting and stopping points
    this.foldingStartMarker = /\b(rule|declare|query|when|then)\b/; 
    this.foldingStopMarker = /\bend\b/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1]) {
                var position = {row: row, column: line.length};
                var iterator = new TokenIterator(session, position.row, position.column);
                var seek = "end";
                var token = iterator.getCurrentToken();
                if (token.value == "when") {
                    seek = "then";
                }
                while (token) {
                    if (token.value == seek) { 
                        return Range.fromPoints(position ,{
                            row: iterator.getCurrentTokenRow(),
                            column: iterator.getCurrentTokenColumn()
                        });
                    }
                    token = iterator.stepForward();
                }
            }

        }
        // test each line, and return a range of segments to collapse
    };

}).call(FoldMode.prototype);

