/**
 * Created by takashima on 15/10/24.
 */

(function(){


    G.script.Expression = function(children){
        this.children = children;
    };

    var Expr = G.script.Expression;
    var Atom = G.script.Atom;
    var Complex = G.script.Complex;
    var Util = G.script.Util;

    Expr.createExpressionByStr = function(str){
        str = Util.trimParen(str);
        var children = [];
        var head = "";
        while (str.length > 0) {
            str = Util.trimParen(str);
            var f = _.find(Atom.Atoms, function(x){
                return x.headRegStr.test(str);
            });
            if (f) {
                head = str.match(f.headRegStr)[0];
                children.push(Atom.createAtom(head));
                str = _.trimLeft(str, head);
            } else if (str.match(/^\(/)) {
                head = Expr.getBetweenParen(str);
                children.push(Expr.createExpressionByStr(head));
                str = _.trimLeft(str, head);
                var b;
            } else {
                throw new Error("invalid expression");
            }
        }
        return Expr.createExpressionByChildren(children);
    };


    Expr.createExpressionByChildren = function(children){
        return new Expr(children);
    };

    Expr.getBetweenParen = function(str){
        var s = "";
        var i = 0;
        var depth = 0;
        do {
            switch (str.charAt(i)) {
                case "(":
                    depth++;
                    break;
                case ")":
                    depth--;
                    break;
                default:
                    break;
            }
            if (str.length <= i) {
                throw new Error("wrong paren");
            }
            s += str.charAt(i);
            i++;
        } while (depth > 0);
        return s;
    };

    Expr.prototype.disCompose = function(){
        var min = _.min(this.children, "priority");
        var index = _.lastIndexOf(this.children, min);
        var mid = [this.children[index]];
        var bfr = this.children.slice(0, index);
        var aft = this.children.slice(index + 1);
        return {
            mid : Expr.createExpressionByChildren(mid),
            bfr : Expr.createExpressionByChildren(bfr),
            aft : Expr.createExpressionByChildren(aft)
        };
    };

}());