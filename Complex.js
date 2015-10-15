/**
 * Created by takashima on 15/10/15.
 */

var Complex = function(re, im){
    this.re = re;
    this.im = im;
    this.getRe = function(){
        return this.re;
    };
    this.getIm = function(){
        return this.im;
    };
    this.abs = function(){
        return Math.sqrt(this.abs2());
    }
    this.abs2 = function() {
        return this.re ^ 2 + this.im ^ 2;
    }
};

window.onload = function(){
    var a = new Complex(1,-1);

    alert(a.abs());
};