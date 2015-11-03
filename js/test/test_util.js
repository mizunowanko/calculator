/**
 * Created by takashima on 15/10/17.
 */




(function(){

    var Util = G.script.Util;

    G.test.TestUtil.testGetPropertyArr = function(){
        var a = G.script.Operator.Operators;
        var b = Util.getPropertyArr(a, "name");
        console.log(b);
    };

    G.test.TestUtil.testLastIndexOf = function(){
        var str = "abc+ooo-3";
        var finds = ["+", "-"];
        window.console.log(Util.lastIndexOf(str, finds));
    };

    var testTrimParen = function(){
        var str = "(aaa)";
        var str2 = Util.trimParen(str);
        console.log(str2);
    };

    window.onload = testTrimParen();
}());