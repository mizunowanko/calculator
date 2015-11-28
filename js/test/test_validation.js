/**
 * Created by takashima on 15/11/12.
 */

(function(){
    function test_madeFromAtoms(){
        var val = G.script.Validation;
        var str = "((1i))";
        var reg = new RegExp("^(\\-|\\*)+$");
        var suc = reg.test(str);
        var result = val.checkParen(str);
        //document.write(suc);
        //document.write(val.validate(str));
        document.write(result);
    }
}());