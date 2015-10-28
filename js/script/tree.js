/**
 * Created by takashima on 15/10/17.
 */

(function(){

    G.script.Tree = function(str, left, right){
        this.root = str;
        this.left = left;
        this.right = right;
    };

    var Tree = G.script.Tree;

    Tree.prototype.toString = function(){
        return "root : " + this.root + ", left : " + this.left + ", right : " + this.right;
    };


    Tree.strToTreeByBinaryOperator = function(str, operators){

    };

}());