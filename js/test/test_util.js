/**
 * Created by takashima on 15/10/17.
 */


G.test.TestUtil = function () {
};

G.test.TestUtil.testLastIndexOf = function () {
    var str = "abc+ooo-3";
    var finds = ["+", "-"];
    window.console.log(G.script.Util.lastIndexOf(str, finds));
};


window.onload = G.test.TestUtil.testLastIndexOf;