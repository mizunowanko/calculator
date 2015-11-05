/**
 * Created by takashima on 15/10/17.
 */

(function(){

    G.script.Tree = function(expression){
        this.expression = expression;
    };


    var Tree = G.script.Tree;
    var Atom = G.script.Atom;
    var Expr = G.script.Expression;

    Tree.prototype.toString = function(){
        var str = "";
        str += _.repeat("----", this.depth);
        str += this.expression.children[0].str + "<br>";
        if (this.left !== null) {
            str += this.left.toString() + "<br>";
        }
        if (this.right !== null) {
            str += this.right.toString() + "<br>";
        }
        return str;
    };

    Tree.createTree = function(expression){
        var tree = new Tree(expression);
        tree.expand();
        tree.setDepth(0);
        return tree;
    };


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
                    this.expression = root;
                    this.left = new Tree(Expr.createExpressionByStr("0"));
                    this.right = new Tree(right);
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

    Tree.prototype.setDepth = function(depth){
        this.depth = depth;
        if (this.right !== null) {
            this.right.setDepth(depth + 1);
        }
        if (this.left !== null) {
            this.left.setDepth(depth + 1);
        }
    };

    Tree.getValue = function(tree){
        if (tree === null) {
            return undefined;
        }
        var val = tree.expression.children[0].behave(Tree.getValue(tree.left), Tree.getValue(tree.right));
        return val;
    };


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