/**
 * Created by takashima on 15/10/16.
 */


G.test.TestComplex = function(){
};

G.test.TestComplex.testExp = function(){
    var a = new G.model.Complex(0, 0);
    alert(a.exp());
};

G.test.TestComplex.testPow = function(){
    var a = new G.model.Complex(2, 0);
    var b = new G.model.Complex(1, 1);
    alert(G.model.Complex.pow(a, b));
};


window.onload = G.test.TestComplex.testPow;