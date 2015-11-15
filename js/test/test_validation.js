/**
 * Created by takashima on 15/11/12.
 */

(function(){
    function test_madeFromatoms(){
        var val = G.script.Validation;
        var str = "(1i)";
        var reg = new RegExp("^(\\-|\\*)+$");
        var suc = reg.test(str);
        //document.write(suc);
        document.write(val.validate(str));
    }

    window.onload = test_madeFromatoms();
}());