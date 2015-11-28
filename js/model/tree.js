/**
 * Created by takashima on 15/10/17.
 */

(function(){

    /**
     * 式の木構造を表すクラス
     * @class Tree
     * @param expression   Expressionオブジェクト
     * @constructor
     */
    G.model.Tree = function(expression){
        this.expression = expression;
    };


    var Tree = G.model.Tree;
    var Atom = G.model.Atom;
    var Expr = G.model.Expression;

    /**
     * 木構造を文字列で表現
     * @method toString
     * @returns {string}
     */
    Tree.prototype.toString = function(){
        var str = "";
        str += _.repeat("----", this.depth);
        str += this.expression.children[0].str + "<br>";
        if (this.left !== null) {
            str += this.left.toString();
        }
        if (this.right !== null) {
            str += this.right.toString();
        }
        return str;
    };

    /**
     * ExpressionオブジェクトからTreeオブジェクトを生成する
     * @static
     * @method createTree
     * @param expression    Expressionオブジェクト
     * @returns {G.model.Tree|{}}
     */
    Tree.createTree = function(expression){
        var tree = new Tree(expression);
        tree.expand();
        tree.setDepth(0);
        return tree;
    };

    /**
     * 木構造を展開する
     * @method expand
     */
    Tree.prototype.expand = function(){
        var kinds = Atom.Kinds;
        var rootAndBranch = this.expression.disCompose();
        var mid = rootAndBranch.mid;
        var bfr = rootAndBranch.bfr;
        var aft = rootAndBranch.aft;
        switch (mid.children[0].kind) {
            case kinds.operator:
                Tree.hasBfr(rootAndBranch, true);
                Tree.hasAft(rootAndBranch, true);
                this.expression = mid;
                this.left = new Tree(bfr);
                this.right = new Tree(aft);
                break;
            case kinds.sub:
                if (bfr.children.length > 0) {
                    Tree.hasBfr(rootAndBranch, true);
                    this.expression = mid;
                    this.left = new Tree(bfr);
                    this.right = new Tree(aft);
                } else {
                    Tree.hasAft(rootAndBranch, true);
                    this.expression = mid;
                    this.left = new Tree(Expr.createExpressionByStr("0"));
                    this.right = new Tree(aft);
                }
                break;
            case kinds.func:
                Tree.hasBfr(rootAndBranch, false);
                Tree.hasAft(rootAndBranch, true);
                this.expression = mid;
                this.left = new Tree(aft);
                this.right = null;
                break;
            case kinds.num:
                Tree.hasBfr(rootAndBranch, false);
                Tree.hasAft(rootAndBranch, false);
                this.left = null;
                this.right = null;
                break;
            default :
                throw new Error("invalid kind");
                break;
        }
        if (this.left) {
            this.left.expand();
        }
        if (this.right) {
            this.right.expand();
        }
    };

    /**
     * 木の深さを設定する
     * @method setDepth
     * @param depth {number}    設定する深さ
     */
    Tree.prototype.setDepth = function(depth){
        this.depth = depth;
        if (this.right !== null) {
            this.right.setDepth(depth + 1);
        }
        if (this.left !== null) {
            this.left.setDepth(depth + 1);
        }
    };

    /**
     * 式木の値を計算する
     * @static
     * @method getValue
     * @param tree {G.model.Tree}  値を計算したい木
     * @returns {*}
     */
    Tree.getValue = function(tree){
        if (tree === null) {
            return undefined;
        }
        var val = tree.expression.children[0].behave(Tree.getValue(tree.left), Tree.getValue(tree.right));
        return val;
    };

    /**
     * Expression.disComposeによって取得されたオブジェクトがbfrを持っているかを調べる
     * @param rootAndBranch Expression.disComposeによって取得されたオブジェクト
     * @param bool  {boolean}   trueならbfrを持つか調べ、falseなら持っていないか調べる
     */
    Tree.hasBfr = function(rootAndBranch, bool){
        if (bool) {
            if (rootAndBranch.bfr.children.length === 0) {
                throw new Error(rootAndBranch.mid.children[0].kind + " need bfr");
            }
        } else {
            if (rootAndBranch.bfr.children.length > 0) {
                throw new Error(rootAndBranch.mid.children[0].kind + " don't need bfr");
            }
        }
    };

    /**
     * Expression.disComposeによって取得されたオブジェクトがaftを持っているかを調べる
     * @param rootAndBranch Expression.disComposeによって取得されたオブジェクト
     * @param bool  {boolean}   trueならaftを持つか調べ、falseなら持っていないか調べる
     */
    Tree.hasAft = function(rootAndBranch, bool){
        if (bool) {
            if (rootAndBranch.aft.children.length === 0) {
                throw new Error(rootAndBranch.mid.children[0].kind + " need aft");
            }
        } else {
            if (rootAndBranch.aft.children.length > 0) {
                throw new Error(rootAndBranch.mid.children[0].kind + " don't need aft");
            }
        }
    };
}());