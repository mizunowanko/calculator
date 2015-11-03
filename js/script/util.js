/**
 * Created by takashima on 15/10/17.
 */

(function(){
    G.script.Util = function(){
    };

    var Util = G.script.Util;


//配列内のオブジェクトの特定のプロパティだけを配列にして返す
    Util.getPropertyArr = function(arr, property){
        return arr.map(function(x){
            return x[property]
        });
    };


//lastIndexOfの、検索文字を複数取れるバージョン。
//全ての検索文字で添字を検索し、最も値の大きい物を返す
    Util.lastIndexOf = function(str, finds){

        //インデックスを格納する配列
        var indexes = [];

        //検索文字全てでインデックスを検索
        for (var i = 0; i < finds.length; i++) {
            indexes.push(str.lastIndexOf(finds[i]));
        }

        //最大値を返す
        var ans = Math.max.apply(null, indexes)
        return ans;
    };

//文字列の両端がカッコだったら、それを取り除く
    Util.trimParen = function(str){
        if (str.match(/^\(.+\)$/)) {
            str = str.replace(/^\(/, "");
            str = str.replace(/\)$/, "");
        }
        return str;
    };




}());


