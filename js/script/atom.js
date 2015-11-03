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
            regStr : "\\+",
            priority : 2,
            kind : Kinds.operator,
            behave : Complex.add
        }),
        sub : new Atom({
            str : "-",
            regStr : "\\-",
            priority : 2,
            kind : Kinds.sub,
            behave : Complex.sub
        }),
        mlt : new Atom({
            str : "*",
            regStr : "\\*",
            priority : 4,
            kind : Kinds.operator,
            behave : Complex.mlt
        }),
        div : new Atom({
            str : "/",
            regStr : "\\/",
            priority : 4,
            kind : Kinds.operator,
            behave : Complex.div
        }),
        pow : new Atom({
            str : "^",
            regStr : "\\^",
            priority : 6,
            kind : Kinds.operator,
            behave : Complex.pow
        }),
        id : new Atom({
            str : "id",
            regStr : "id",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.id
        }),
        exp : new Atom({
            str : "exp",
            regStr : "exp",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.exp
        }),
        log : new Atom({
            str : "log",
            regStr : "log",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.log
        }),
        pi : new Atom({
            str : "pi",
            regStr : "pi",
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(Math.PI, 0);
            }
        }),
        e : new Atom({
            str : "e",
            regStr : "e",
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(Math.E, 0);
            }
        }),
        im : new Atom({
            regStr : "\\d*i",
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                if (this.str === "i") {
                    return new Complex(0, 1);
                } else {
                    return new Complex(0, Number(_.trimRight(this.str, "i")));
                }
            }
        }),
        re : new Atom({
            regStr : "\\d+",
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(Number(this.str), 0);
            }
        }),
        expression : new Atom({
            priority : 10
        })
    };


    var atoms = Atom.Atoms;


    Atom.createAtom = function(str){
        var atm = _.find(atoms, function(atom){
            return str.match(atom.reg());
        });
        if (str.match(atoms.re.reg())) {
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (str.match(atoms.im.reg())) {
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (atm === undefined) {
            throw new Error("This str is not an atom");
        }
        return atm;
    };


    Atom.prototype.reg = function(){
        return new RegExp(this.regStr);
    };

    Atom.prototype.headReg = function(){
        return new RegExp("^" + this.regStr);
    };

    Atom.prototype.betweenParenReg = function(){
        return new RegExp("(" + this.regStr + ")");
    };


}());