/**
 * Created by takashima on 15/10/17.
 */

(function(){

    G.script.Operator = function(name, priority, applying){
        this.name = name;
        this.priority = priority;
        this.applying = applying;
    };

    var Opr = G.script.Operator;
    var Cmp = G.script.Complex;

//全ての演算子の配列
    Opr.operators = [
        new Opr("+", 2, Cmp.add),
        new Opr("-", 2, Cmp.sub),
        new Opr("log", 4, Cmp.log),
        new Opr("*", 6, Cmp.mlt),
        new Opr("/", 6, Cmp.div),
        new Opr("^", 8, Cmp.pow)
    ];


//特定の優先順位の演算子を全て格納した配列を返す
    Opr.filterByPriority = function(pri){
        var a = Opr.operators.filter(function(x){
            return x.priority === pri
        });
        return a;
    };
}());