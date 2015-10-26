/**
 * Created by takashima on 15/10/17.
 */



G.test.TestOperator = function(){};

//配列内のオブジェクトのあるプロパティだけを取り出す


G.test.TestOperator.testFilterByPriority = function(){
    var a = G.script.Operator.filterByPriority(2);
    console.log(a);
};


window.onload = G.test.TestOperator.testFilterByPriority;