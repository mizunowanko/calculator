/**
 * Created by takashima on 15/11/24.
 */


window.onload = function(){
    $('.key').click(function(){
        $('#display')
            // insert before string '<strong>'
            // <strong> を選択テキストの前に挿入
            .selection('insert', {text : '<strong>', mode : 'before'})
            // insert after string '</strong>'
            // </strong> を選択テキストの後に挿入
            .selection('insert', {text : '</strong>', mode : 'after'});
    });
};



