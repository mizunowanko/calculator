/**
 * Created by takashima on 15/10/24.
 */

(function(){


    G.script.Expression = function(str){
        str = Expr.trimParen(str);
        this.strToExpressions(str);
    };

    var Expr = G.script.Expression;
    var Complex = G.script.Complex;

    //文字列を式の配列に変換する
    Expr.prototype.strToExpressions = function(str){

        if (str === "+") {
            this.expressions = null;
            this.priority = 2;
            //this.kind = ;
            this.behave = Complex.add;
        } else if (str === "-") {
            this.expressions = null;
            this.priority = 2;
            //this.kind
            this.behave = Complex.sub;
        } else if (str === "*") {
            this.expressions = null;
            this.priority = 4;
            //
            this.behave = Complex.mlt;
        } else if (str === "/") {
            this.expressions = null;
            this.priority = 4;
            //this.kind
            this.behave = Complex.div;
        }
        case
        "exp"
        :
        this.expressions = null;
        this.priority = 6;
        //this.kind
        this.behave = Complex.exp;
        break;
        case
        "log"
        :
        this.expressions = null;
        this.priority = 6;
        //this.kind
        this.behave = Complex.log;
        break;
        case
        "pi"
        :
        this.expressions = null;
        this.priority = 8;
        //this.kind
        this.behave = function(){
            return Math.PI;
        };
        break;
        case
        "e"
        :
        this.expressions = null;
        this.priority = 8;
        //this.kind
        this.behave = function(){
            return Math.E;
        };
        break;

    };

    //式の種類の獲得
    Expr.prototype.getKind = function(){

    };

    //文字列の両端がカッコだったら、それを取り除く
    Expr.trimParen = function(str){
        if (str.slice(0) === "(" && str.slice(-1) === ")") {
            str = _.trimLeft(_.trimRight(str, ")"), "(");
        }

        return str;
    }


}());