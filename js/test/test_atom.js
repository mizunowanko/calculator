/**
 * Created by takashima on 15/11/01.
 */


(function(){
    var Atom = G.script.Atom;
    var a = new Atom("aoeu");
    var as = {aa : "aaa", bb : "bbb"};
    var y = _.find(as, function(x){
        return x === "aaa";
    });
    console.log(y);
}());