/**
 * Created by takashima on 15/10/24.
 */

(function(){

    /**
     * 式を表すオブジェクト
     * @class Expression
     * @param children  式に内包されるAtomまたはExpression
     * @constructor
     */

    G.script.Expression = function(children){
        this.children = children;
    };

    var Expr = G.script.Expression;
    var Atom = G.script.Atom;

    /**
     * 文字列からExpressionを生成する
     * @static
     * @method createExpressionByStr
     * @param str {String}  式の文字列
     * @return {G.script.Expression}    Expressionオブジェクト
     */
    Expr.createExpressionByStr = function(str){
        var children = [];
        var head = "";
        while (str.length > 0) {
            //str = Expr.trimParen(str);
            var f = _.find(Atom.Atoms, function(x){
                return x.headReg().test(str);
            });
            if (str.match(/^\(/)) {
                if (Expr.getBetweenParen(str) === str) {
                    var inner = Expr.trimParen(str);
                    children.push(Atom.createAtom("id"));
                    children.push(Expr.createExpressionByStr(inner));
                    str = "";
                } else if (str.match(/^\(/)) {
                    head = Expr.getBetweenParen(str);
                    children.push(Expr.createExpressionByStr(head));
                    str = _.trimLeft(str, head);
                }
            } else if (f) {
                head = str.match(f.headReg())[0];
                children.push(Atom.createAtom(head));
                str = _.trimLeft(str, head);
            } else {
                throw new Error("invalid expression");
            }
        }
        return Expr.createExpressionByChildren(children);
    };


    /**
     * childrenをもとにExpressionオブジェクトを生成する。
     * @static
     * @method createExpressionByChildren
     * @param children  新しいExpressionオブジェクトに含まれるchildren
     * @returns {G.script.Expression|{}}    新しいExpressionオブジェクト
     */
    Expr.createExpressionByChildren = function(children){
        if (children.length === 1 && children[0] instanceof Expr) {
            //childrenが単一のExpressionだけを含む場合、Expression内部のchildrenを開封して使う
            children = children[0].children;
        }
        return new Expr(children);
    };


    /**
     * 文字列から先頭の()に囲まれた部分を抽出して返す
     * @static
     * @method getBetweenParen
     * @param str {string}  文字列
     * @returns {string}    先頭の()に囲まれた部分
     */
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

    /**
     * 木構造にできるように式を３つの部分に分解する。分割は最も優先順位の低い結合を基準に行う
     * @method disCompose
     * @returns {{mid: (G.script.Expression|{}), bfr: (G.script.Expression|{}), aft: (G.script.Expression|{})}} midを中心に、Expressionをleft,mid,rightの３つに分割し、それぞれを内包したオブジェクトを返す
     */
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

    /**
     * 文字列の両端がカッコだったら、それを取り除く
     * @method trimParen
     * @param str {string}  両端のカッコを取り除きたい文字列
     * @returns {string}    両端がカッコだったらそれを取り除き、異なれば引数をそのまま返す
     */
        //
    Expr.trimParen = function(str){
        if (str.match(/^\(.+\)$/)) {
            str = str.replace(/^\(/, "");
            str = str.replace(/\)$/, "");
        }
        return str;
    };

}());