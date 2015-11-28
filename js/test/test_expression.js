/**
 * Created by takashima on 15/10/24.
 */




(function(){

    var Expr = G.model.Expression;

    var testExpression = function(){

        var atoms = G.model.Atom.Atoms;

        var a = "+";
        var r = atoms.add.headReg;
        var b = a.match(r);

        //var str = "+aa";
        //_.forEach(atoms, (function(x){
        //    console.log(x.headReg.test(str));
        //}));
        //var f =_.find(atoms, function(x){
        //    return x.headReg.test(str);
        //});

        var c = a.replace("+", "");


        var t1 = Expr.createExpressionByStr("(+)");
        console.log(t1.toString());
        var t2 = Expr.createExpressionByStr("-3i");
        var t3 = Expr.createExpressionByStr("2*(e-2)");
        var dis = t2.disCompose();
        var a;
    };


    window.onload = testExpression;


}());
