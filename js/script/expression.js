/**
 * Created by takashima on 15/10/24.
 */

(function(){


    G.script.Expression = function(children){
        this.children = children;
        this.priority = Atom.Atoms.expression.priority;
    };

    var Expr = G.script.Expression;
    var Atom = G.script.Atom;

    //Expr.prototype.toString = function(){
    //    var str = "";
    //    _.each(this.children,function(x){
    //        if(x instanceof  Atom){
    //            str += x.str;
    //        }else{
    //            str += x.toString();
    //        }
    //    });
    //    return str;
    //};

    Expr.createExpressionByStr = function(str){
        var children = [];
        var head = "";
        while (str.length > 0) {
            //str = Expr.trimParen(str);
            var f = _.find(Atom.Atoms, function(x){
                return x.headReg().test(str);
            });
            if (f) {
                head = str.match(f.headReg())[0];
                children.push(Atom.createAtom(head));
                str = _.trimLeft(str, head);
            } else if (str.match(/^\(.+\)$/)) {
                var inner = Expr.trimParen(str);
                children.push(Atom.createAtom("id"));
                children.push(Expr.createExpressionByStr(inner));
                str = "";
            } else if (str.match(/^\(/)) {
                head = Expr.getBetweenParen(str);
                children.push(head);
                str = _.trimLeft(str, head);
            } else {
                throw new Error("invalid expression");
            }
        }
        return Expr.createExpressionByChildren(children);
    };


    Expr.createExpressionByChildren = function(children){
        if (children.length === 1 && children[0] instanceof Expr) {
            children = children[0].children;
        }
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

    //文字列の両端がカッコだったら、それを取り除く
    Expr.trimParen = function(str){
        if (str.match(/^\(.+\)$/)) {
            str = str.replace(/^\(/, "");
            str = str.replace(/\)$/, "");
        }
        var nums = _.filter(Atom.Atoms, function(x){
            return x.kind === Atom.Kinds.num;
        });
        //nums.forEach(function(x){
        //    var reg =
        //});
        return str;
    };

}());