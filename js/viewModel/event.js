/**
 * Created by takashima on 15/11/24.
 */

(function(){

    var Expr = G.model.Expression;
    var Tree = G.model.Tree;

    window.onload = function(){
        setKeyEvent.call($(".key").eq(0), "π", "pi", "");
        setKeyEvent.call($(".key").eq(1), "e", "e", "");
        setKeyEvent.call($(".key").eq(2), "^", "^", "");
        setKeyEvent.call($(".key").eq(3), "abs", "abs(", ")");
        setKeyEvent.call($(".key").eq(4), "", "", "");

        setKeyEvent.call($(".key").eq(5), "sin", "sin(", ")n");
        setKeyEvent.call($(".key").eq(6), "cos", "cos(", ")");
        setKeyEvent.call($(".key").eq(7), "tan", "tan(", ")");
        setKeyEvent.call($(".key").eq(8), "exp", "exp(", ")");
        setKeyEvent.call($(".key").eq(9), "log", "log(", ")");

        setKeyEvent.call($(".key").eq(10), "sinh", "sinh(", ")");
        setKeyEvent.call($(".key").eq(11), "cosh", "cosh(", ")");
        setKeyEvent.call($(".key").eq(12), "tanh", "tanh(", ")");
        setKeyEvent.call($(".key").eq(13), "(", "(", "");
        setKeyEvent.call($(".key").eq(14), ")", ")", "");

        setKeyEvent.call($(".key").eq(15), "7", "7", "");
        setKeyEvent.call($(".key").eq(16), "8", "8", "");
        setKeyEvent.call($(".key").eq(17), "9", "9", "");
        setKeyEvent.call($(".key").eq(18), "", "", "");
        setKeyEvent.call($(".key").eq(19), "", "", "");

        setKeyEvent.call($(".key").eq(20), "4", "4", "");
        setKeyEvent.call($(".key").eq(21), "5", "5", "");
        setKeyEvent.call($(".key").eq(22), "6", "6", "");
        setKeyEvent.call($(".key").eq(23), "×", "*", "");
        setKeyEvent.call($(".key").eq(24), "÷", "/", "");

        setKeyEvent.call($(".key").eq(25), "1", "1", "");
        setKeyEvent.call($(".key").eq(26), "2", "2", "");
        setKeyEvent.call($(".key").eq(27), "3", "3", "");
        setKeyEvent.call($(".key").eq(28), "+", "+", "");
        setKeyEvent.call($(".key").eq(29), "-", "-", "");

        setKeyEvent.call($(".key").eq(30), "0", "0", "");
        setKeyEvent.call($(".key").eq(31), ".", ".", "");
        setKeyEvent.call($(".key").eq(32), "i", "i", "");
        setKeyEvent.call($(".key").eq(33), "", "", "");
        setSpecialKeyEvent.call($(".key").eq(34), "=", getValue);
    };

    var setKeyEvent = function(keyStr, before, after, mode){
        this.append(keyStr);
        this.click(function(){
            $('#display')
                .selection('insert', {text : before, mode : 'before'})
                .selection('insert', {text : after, mode : 'after'});
        });
    };

    var setSpecialKeyEvent = function(keyStr, func){
        this.append(keyStr);
        this.click(func);
    };


    var getValue = function(){
        var text = $("#display").val();
        var expr = Expr.createExpressionByStr(text);
        var tree = Tree.createTree(expr);
        var val = Tree.getValue(tree);
        $("#display").val(val);
    };


}());


