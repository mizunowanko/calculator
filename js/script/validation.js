/**
 * Created by takashima on 15/11/11.
 */


(function(){
    /**
     * 入力の妥当性チェック
     * @class Validation
     * @constructor
     */
    G.script.Validation = function(){

    };

    var validation = G.script.Validation;
    var atom = G.script.Atom;

    validation.validate = function(str){
        str = _.trim(str);
        if (!validation.isMadeFromOnlyAtoms(str)) {
            throw new Error("数値、演算子、関数ではない文字列が含まれています。");
        }
    };

    validation.isMadeFromOnlyAtoms = function(str){
        var atomStr = _.pluck(atom.Atoms, "regStr").join("|");
        atomStr = "^(" + atomStr + ")+$";
        var reg = new RegExp(atomStr);
        if (str.match(reg)) {
            return true;
        } else {
            return false;
        }
    };

}());

