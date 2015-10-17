/**
 * Created by takashima on 15/10/17.
 */



G.test.TestOperator = function(){};


//特定の優先順位の演算子を出す
G.test.TestOperator.testFilterByPriority = function(){
    var a = G.script.Operator.filterByPriority(2);
    console.log(a);
};


window.onload = G.test.TestOperator.testFilterByPriority;