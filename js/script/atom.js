/**
 * Created by takashima on 15/11/01.
 */


(function(){
    G.script.Atom = function(obj){
        this.str = obj.str;
        this.regStr = obj.regStr;
        this.headRegStr = obj.headRegStr;
        this.priority = obj.priority;
        this.behave = obj.behave;
        this.kind = obj.kind;
    };

    var Atom = G.script.Atom;
    var Complex = G.script.Complex;


    Atom.Kinds = {
        operator : "operator",
        sub : "sub",
        num : "num",
        func : "func"
    };

    var Kinds = Atom.Kinds;


    Atom.Atoms = {
        add : new Atom({
            str : "+",
            regStr : /\+/,
            headRegStr : /^\+/,
            priority : 2,
            kind : Kinds.operator,
            behave : Complex.add
        }),
        sub : new Atom({
            str : "-",
            regStr : /\-/,
            headRegStr : /^\-/,
            priority : 2,
            kind : Kinds.sub,
            behave : Complex.sub
        }),
        mlt : new Atom({
            str : "*",
            regStr : /\*/,
            headRegStr : /^\*/,
            priority : 4,
            kind : Kinds.operator,
            behave : Complex.mlt
        }),
        div : new Atom({
            str : "/",
            regStr : /\//,
            headRegStr : /^\//,
            priority : 4,
            kind : Kinds.operator,
            behave : Complex.div
        }),
        pow : new Atom({
            str : "^",
            regStr : /\^/,
            headRegStr : /^\^/,
            priority : 6,
            kind : Kinds.operator,
            behave : Complex.pow
        }),
        exp : new Atom({
            str : "exp",
            regStr : /exp/,
            headRegStr : /^exp/,
            priority : 8,
            kind : Kinds.func,
            behave : Complex.exp
        }),
        log : new Atom({
            str : "log",
            regStr : /log/,
            headRegStr : /^log/,
            priority : 8,
            kind : Kinds.func,
            behave : Complex.log
        }),
        pi : new Atom({
            str : "pi",
            regStr : /pi/,
            headRegStr : /^pi/,
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return Math.PI;
            }
        }),
        e : new Atom({
            str : "e",
            regStr : /e/,
            headRegStr : /^e/,
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return Math.E;
            }
        }),
        im : new Atom({
            regStr : /\d*i/,
            headRegStr : /^\d*i/,
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(0, Number(_.trimRight(this.str, "i")));
            }
        }),
        re : new Atom({
            regStr : /\d+/,
            headRegStr : /^\d+/,
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(Number(this.str), 0);
            }
        })
    };


    var atoms = Atom.Atoms;


    Atom.createAtom = function(str){
        var atm = _.find(atoms, function(atom){
            return str.match(atom.regStr);
        });
        if (str.match(atoms.re.regStr)) {
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (str.match(atoms.im.regStr)) {
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (atm === undefined) {
            throw new Error("This str is not an atom");
        }
        return atm;
    };


}());