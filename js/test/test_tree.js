/**
 * Created by takashima on 15/10/17.
 */


(function(){


    G.test.TestTree = function(){

    };

    G.test.TestTree.testInstance = function(){
        var tree = new G.model.Tree("ルート", null, null);
        console.log(tree.toString());
    };

    var Complex = G.model.Complex;
    var Atom = G.model.Atom;
    var Expr = G.model.Expression;
    var Tree = G.model.Tree;

    var testExpand = function(){



        //_.each(Atom.Atoms,(function(x){
        //    console.log(x.headReg());
        //}));
        var expr1 = Expr.createExpressionByStr("-log(1+i)^(1+i)");
        var tree = Tree.createTree(expr1);
        var value = Tree.getValue(tree);
        document.write(tree.toString());
        document.write(value);
    };

    window.onload = testExpand();
}());


