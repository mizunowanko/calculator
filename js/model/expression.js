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

    G.model.Expression = function(children){
        this.children = children;
    };

    var Expr = G.model.Expression;
    var Atom = G.model.Atom;

    /**
     * 文字列からExpressionを生成する
     * @static
     * @method createExpressionByStr
     * @param str {String}  式の文字列
     * @return {G.model.Expression}    Expressionオブジェクト
     */
    Expr.createExpressionByStr = function(str){

        //生成するExpressionオブジェクトが内包するchildren
        var children = [];

        //文字列の先頭
        var head = "";

        /*文字列を先頭からAtomまたはExpressionとして解釈し、それらをchildrenに追加し、先頭をstrから削除する。
         最初がカッコだった場合とそうでない場合とで場合分けをする
         strが空になるまでこれを続ける。
         */
        while (str.length > 0) {

            //先頭が左カッコか判定
            if (str.match(/^\(/)) {

                //文字列全体が１組のカッコによって囲まれているかどうかを判定
                if (Expr.getFirstStrBetweenParen(str) === str) {

                    //文字列から両端のカッコを取り除いた文字列
                    var inner = Expr.trimParen(str);

                    //恒等関数とinnerから生成したExpressionをchildrenに入れる
                    children.push(Atom.createAtom("id"));
                    children.push(Expr.createExpressionByStr(inner));

                    //文字列を空にする
                    str = "";
                } else {

                    //文字列のうち、最初のカッコに囲まれた部分からExpressionを生成し、childrenに加える
                    head = Expr.getFirstStrBetweenParen(str);
                    var inner = Expr.trimParen(head);
                    children.push(Expr.createExpressionByStr(inner));

                    //文字列から最初のカッコを取り除く
                    str = _.trimLeft(str, head);
                }
            } else {

                //文字列の最初のAtomを取得する
                var fstAtom = _.find(Atom.Atoms, function(x){
                    return x.headReg().test(str);
                });

                //文字列の最初がAtomか判定
                if (fstAtom) {

                    //最初のAtomをchildrenに追加し、文字列からそのAtomを削除する
                    head = str.match(fstAtom.headReg())[0];
                    children.push(Atom.createAtom(head));
                    str = _.trimLeft(str, head);
                } else {
                    //最初がカッコでもAtomでもない場合、エラーを吐く
                    throw new Error("invalid expression");
                }
            }
        }
        //生成したchildrenを元にしたExpressionを返す
        return Expr.createExpressionByChildren(children);
    };


    /**
     * childrenをもとにExpressionオブジェクトを生成する。
     * @static
     * @method createExpressionByChildren
     * @param children  新しいExpressionオブジェクトに含まれるchildren
     * @returns {G.model.Expression|{}}    新しいExpressionオブジェクト
     */
    Expr.createExpressionByChildren = function(children){
        if (children.length === 1 && children[0] instanceof Expr) {
            //childrenが単一のExpressionだけを含む場合、Expression内部のchildrenを開封して使う
            children = children[0].children;
        }
        return new Expr(children);
    };


    /**
     * 文字列の中から、()に囲まれた最初の部分を抽出して返す
     * @static
     * @method getFirstStrBetweenParen
     * @param str {string}  文字列
     * @returns {string}    先頭の()に囲まれた部分
     */
    Expr.getFirstStrBetweenParen = function(str){

        //返すべき文字列
        var s = "";

        //先頭から何文字目かを表す
        var i = 0;

        //カッコによるネストの深さを表す数値
        var depth = 0;

        //先頭から文字列を走査し、左カッコならdepthを1増やし、右カッコなら1減らす
        //これをdepthが0になるまで行う
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

            //文字列が終わったにも関わらずdepthが0以上の場合、カッコの記述が正しくないのでエラーを吐く
            if (str.length <= i) {
                throw new Error("wrong paren");
            }

            //返すべき文字列に走査している文字を加える
            s += str.charAt(i);
            i++;
        } while (depth > 0);

        //値を返す
        return s;
    };

    /**
     * 木構造にできるように式を３つの部分に分割する。分割は最も優先順位の低い結合を基準に行う
     * @method disCompose
     * @returns {{mid: (G.model.Expression|{}), bfr: (G.model.Expression|{}), aft: (G.model.Expression|{})}} Expressionをbfr,mid,aftの３つに分割し、それぞれを内包したオブジェクトを返す
     */
    Expr.prototype.disCompose = function(){

        //childrenの中で最も優先順位の低いAtomのchildren内でのインデックスを取得する
        var min = _.min(this.children, "priority");
        var index = _.lastIndexOf(this.children, min);

        //上で取得したインデックスのAtomを中心として、式をbfr, mid, aftの３つに分割する
        var mid = [this.children[index]];
        var bfr = this.children.slice(0, index);
        var aft = this.children.slice(index + 1);

        //bfr, mid, aftを内包するオブジェクトを返す
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
    Expr.trimParen = function(str){
        if (str.match(/^\(.+\)$/)) {
            str = str.replace(/^\(/, "");
            str = str.replace(/\)$/, "");
        }
        return str;
    };

}());