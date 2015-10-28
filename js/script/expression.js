/**
 * Created by takashima on 15/10/24.
 */

(function(){

    //コンストラクタ
    G.script.Expression = function(str){
        str = Expr.trimParen(str);

    };


    var Expr = G.script.Expression;


    //文字列を式の配列に変換する
    Expr.prototype.strToExpressions = function(){


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