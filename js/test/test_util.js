/**
 * Created by takashima on 15/10/17.
 */


G.test.TestUtil.testGetPropertyArr = function () {
    var a = G.script.Operator.Operators;
    var b = Util.getPropertyArr(a, "name");
    console.log(b);
};

G.test.TestUtil.testLastIndexOf = function () {
    var str = "abc+ooo-3";
    var finds = ["+", "-"];
    window.console.log(Util.lastIndexOf(str, finds));
};


window.onload = G.test.TestUtil.testGetPropertyArr;

