/**
 * Created by takashima on 15/10/16.
 */


G.test.TestComplex = function(){
};

G.test.TestComplex.testExp = function(){
    var a = new G.script.Complex(0, 0);
    alert(a.exp());
};

G.test.TestComplex.testPow = function(){
    var a = new G.script.Complex(Math.E, 0);
    var b = new G.script.Complex(0, Math.PI);
    alert(G.script.Complex.pow(a, b));
};


window.onload = G.test.TestComplex.testPow;