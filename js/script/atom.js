/**
 * Created by takashima on 15/11/01.
 */


(function(){

    G.script.Atom = function(obj){
        this.str = obj.str;
        this.regStr = obj.regStr;
        this.priority = obj.priority;
        this.behave = obj.behave;
        this.kind = obj.kind;
    };

    var Atom = G.script.Atom;

    var Complex = G.script.Complex;

    Atom.Atoms = {
        add : new Atom({str : "+", regStr : /\+/, priority : 2, behave : Complex.add}),
        sub : new Atom({str : "-", regStr : /\-/, priority : 2, behave : Complex.sub}),
        mlt : new Atom({str : "*", regStr : /\*/, priority : 4, behave : Complex.mlt}),
        div : new Atom({str : "/", regStr : /\//, priority : 4, behave : Complex.div}),
        pow : new Atom({str : "^", regStr : /\^/, priority : 6, behave : Complex.pow}),
        exp : new Atom({str : "exp", regStr : /exp/, priority : 8, behave : Complex.exp}),
        log : new Atom({str : "log", regStr : /log/, priority : 8, behave : Complex.log}),
        pi : new Atom({
            str : "pi", regStr : /pi/, priority : 10, behave : function(){
                return Math.PI;
            }
        }),
        e : new Atom({
            str : "e", regStr : /e/, priority : 10, behave : function(){
                return Math.E;
            }
        }),
        im : new Atom({
            regStr : /\d*i/, priority : 10, behave : function(){
                return new Complex(0, Number(_.trimLeft(this.str, "i")))
            }
        }),
        re : new Atom({
            regStr : /\d+/, priority : 10, behave : function(){
                return new Complex(Number(this.str));
            }
        })
    };

    var Atoms = Atom.Atoms;

    Atom.atomFactory = function(str){
        _.find(Atoms,)
    }

}());