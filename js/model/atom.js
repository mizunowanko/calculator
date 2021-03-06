/**
 * Created by takashima on 15/11/01.
 */



(function(){

    /**
     * 式の最小単位（数値、演算子、関数等）を表すクラス
     * @class Atom
     * @constructor
     * @param obj {object} プロパティを格納したオブジェクト
     */
    G.model.Atom = function(obj){
        this.str = obj.str;
        this.regStr = obj.regStr;
        this.priority = obj.priority;
        this.behave = obj.behave;
        this.kind = obj.kind;
    };

    var Atom = G.model.Atom;
    var Complex = G.model.Complex;


    /**
     * Atomオブジェクトの４つの種類を格納した擬似列挙型。
     * 種類は「operator(減算以外の演算子)」「sub(減算)」「num(数値)」「func(関数)」「rightParen(右カッコ)」「leftParen(左カッコ)」の６つ。
     * @static
     * @property Kinds
     *
     */
    Atom.Kinds = {
        operator : "operator",

        //-は左側に項がなくても使えるため、他の演算子と区別する
        sub : "sub",
        num : "num",
        func : "func",
        rightParen : "rightParen",
        leftParen : "leftParen"
    };

    var Kinds = Atom.Kinds;


    /**
     * 全ての種類のAtomを格納したオブジェクト。各Atomの性質はこのオブジェクトから取得する。<br/>str : 文字列としての表現 <br/>regStr : 正規表現 <br/>priority : 演算の優先順位。数値が高いほど順位も高い <br/>kind : 種類 <br/>behave : 関数としての振る舞い
     * @static
     * @property Atoms
     * @type {{Atom}}
     */
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
        abs : new Atom({
            str : "abs",
            regStr : "abs",
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
        sin : new Atom({
            str : "sin",
            regStr : "sin(?!h)",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.sin
        }),
        cos : new Atom({
            str : "cos",
            regStr : "cos(?!h)",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.cos
        }),
        tan : new Atom({
            str : "tan",
            regStr : "tan(?!h)",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.tan
        }),
        sinh : new Atom({
            str : "sinh",
            regStr : "sinh",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.sinh
        }),
        cosh : new Atom({
            str : "cosh",
            regStr : "cosh",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.cosh
        }),
        tanh : new Atom({
            str : "tanh",
            regStr : "tanh",
            priority : 8,
            kind : Kinds.func,
            behave : Complex.tanh
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
            regStr : "(\\d+(?:\\.\\d+)?)*i",
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
            regStr : "\\d+(?:\\.\\d+)?",
            priority : 10,
            kind : Kinds.num,
            behave : function(){
                return new Complex(Number(this.str), 0);
            }
        }),
        leftParen : new Atom({
            regStr : "\\(",
            priority : 12,
            kind : Kinds.leftParen
        }),
        rightParen : new Atom({
            regStr : "\\)",
            priority : 12,
            kind : Kinds.rightParen
        })
    };


    var atoms = Atom.Atoms;

    /**
     * Atomオブジェクトの生成。通常はこの関数を使う。
     * @static
     * @method  createAtom
     * @param str   数式として表現されたときの文字列
     * @returns {Atom}
     */
    Atom.createAtom = function(str){

        //Atomsの中から正規表現の一致するものを選ぶ
        var atm = _.find(atoms, function(atom){
            return str.match(atom.reg());
        });

        if (str.match(atoms.re.reg())) {

            //実数なら新しいオブジェクトを返す
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (str.match(atoms.im.reg())) {

            //虚数なら新しいオブジェクトを返す
            atm = _.clone(atm, true);
            atm.str = str;
        } else if (atm === undefined) {

            //正規表現に一致するものがなければエラーを返す
            throw new Error("This str is not an atom");
        }
        return atm;
    };

    /**
     * 正規表現オブジェクトを返す
     * @method reg
     * @returns {RegExp}    正規表現オブジェクト
     */
    Atom.prototype.reg = function(){
        return new RegExp(this.regStr);
    };

    /**
     * 先頭一致を表す正規表現を返す
     * @method headReg
     * @returns {RegExp}    先頭一致をあわらす正規表現オブジェクト
     */
    Atom.prototype.headReg = function(){
        return new RegExp("^" + this.regStr);
    };

    /**
     * カッコに囲まれた正規表現を返す
     * @method betweenParenReg
     * @returns {RegExp}    カッコに囲まれた正規表現を返す
     */
    Atom.prototype.betweenParenReg = function(){
        return new RegExp("(" + this.regStr + ")");
    };


}());