/**
 * Created by takashima on 15/10/24.
 */




(function(){

    var testExpression = function(){
        var t = new G.script.Expression("aaa");
        console.log(t.strToExpressions());
    };


    window.onload = testExpression;


}());
