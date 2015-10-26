/**
 * Created by takashima on 15/10/17.
 */


G.script.Operator= function(name, priority, applying){
    this.name = name;
    this.priority = priority;
    this.applying = applying;
};


//全ての演算子の配列
G.script.Operator.Operators = [
    new G.script.Operator("+", 2),
    new G.script.Operator("-", 2),
    new G.script.Operator("log", 4),
    new G.script.Operator("*", 6),
    new G.script.Operator("/", 6),
    new G.script.Operator("^", 8)
];


//特定の優先順位の演算子を全て格納した配列を返す
G.script.Operator.filterByPriority = function (pri){
    var a = G.script.Operator.Operators.filter(function(x){return x.priority === pri});
    return a;
};


