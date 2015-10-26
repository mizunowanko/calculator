/**
 * Created by takashima on 15/10/17.
 */

G.script.Tree = function(str, left, right){
    this.root = str;
    this.left = left;
    this.right = right;
};

G.script.Tree.prototype.toString = function(){
    return "root : " + this.root + ", left : " + this.left + ", right : " + this.right;
};


G.script.Tree.strToTreeByBinaryOperator = function(str, operators){

};

