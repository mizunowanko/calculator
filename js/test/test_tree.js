/**
 * Created by takashima on 15/10/17.
 */


(function(){


    G.test.TestTree = function(){

    };


    G.test.TestTree.testInstance = function(){
        var tree = new G.script.Tree("ルート", null, null);
        console.log(tree.toString());
    };

    var Complex = G.script.Complex;
    var Atom = G.script.Atom;
    var Expr = G.script.Expression;
    var Tree = G.script.Tree;

    var testExpand = function(){



        //_.each(Atom.Atoms,(function(x){
        //    console.log(x.headReg());
        //}));
        var expr1 = Expr.createExpressionByStr("e^(pi*i/2)");
        var tree = new Tree(expr1);
        tree.expand();
        var value = Tree.getValue(tree);
        alert(value);
    };

    window.onload = testExpand();
}());


