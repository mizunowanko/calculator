/**
 * Created by takashima on 15/10/15.
 **/


(function(){




//+++++++++++++++++++++
// 複素数を表すオブジェクト
//+++++++++++++++++++++

//複素数オブジェクトの定義
    G.script.Complex = function(re, im){

        //実数
        this.re = re;

        //虚数
        this.im = im;
    };

    //複素数オブジェクトを格納するローカル変数
    var Cmp = G.script.Complex;

//--------------------
//     オブジェクト関数
//--------------------


    //toString
    Cmp.prototype.toString = function(){
        return String(this.re.toFixed(2)) + " + " + String(this.im.toFixed(2)) + "i";
    };


//--------------------
//  複素数特有の基本演算
//--------------------


//実数倍
    Cmp.scl = function(k, a){
        return new Cmp(a.re * k, a.im * k);
    };

//絶対値
    Cmp.abs = function(a){
        return Math.sqrt(Cmp.abs2(a));
    };

//絶対値の二乗
    Cmp.abs2 = function(a){
        return Math.pow(a.re, 2) + Math.pow(a.im, 2);
    };

//共役
    Cmp.conj = function(a){
        return new Cmp(a.re, -a.im);
    };

//逆数
    Cmp.inv = function(a){
        var b = new Cmp(a.re, -a.im);
        return Cmp.scl(1 / Cmp.abs2(a), b);

    };

    //恒等関数
    Cmp.id = function(a){
        return a;
    };



//--------------------------------
//    四則演算
//--------------------------------

//加法
    Cmp.add = function(a, b){
        return new Cmp(a.re + b.re, a.im + b.im);
    };

//減法
    Cmp.sub = function(a, b){
        return new Cmp(a.re - b.re, a.im - b.im);
    };

//乗法
    Cmp.mlt = function(a, b){
        return new Cmp(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    };

//除法
    Cmp.div = function(a, b){
        return Cmp.mlt(a, Cmp.inv(b));
    };

//---------------------
//    極形式
//---------------------

//偏角
    Cmp.arg = function(a){
        var x = a.re;
        var y = a.im;
        if (x === 0) {
            if (y > 0) {
                return Math.PI / 2;
            } else if (y < 0) {
                return -Math.PI / 2;
            } else {
                return undefined;
            }
        } else {
            if (x > 0) {
                return Math.atan(y / x);
            } else {
                return Math.atan(y / x) + Math.PI;
            }
        }
    };


//--------------------------------
//    指数関数、対数関数
//--------------------------------

//指数関数
    Cmp.exp = function(a){
        return Cmp.scl(Math.exp(a.re), Cmp.expi(a.im));
    };

//対数関数
    Cmp.log = function(a){
        return new Cmp(Math.log(Cmp.abs(a)), Cmp.arg(a));
    };

//純虚数に対する指数関数
    Cmp.expi = function(y){
        return new Cmp(Math.cos(y), Math.sin(y));
    };

//------------------------
//      三角関数
//------------------------

//sin
    Cmp.sin = function(a){
        var b = Cmp.scl(Math.sin(a.re), Cmp.cosi(a.im)),
            c = Cmp.scl(Math.cos(a.re), Cmp.sini(a.im));
        return Cmp.add(b, c);

    };

//cos
    Cmp.cos = function(a){
        var b = Cmp.scl(Math.cos(a.re), Cmp.cosi(a.im)),
            c = Cmp.scl(Math.sin(a.re), Cmp.sini(a.im));
        return Cmp.add(b, c);
    };

//tan
    Cmp.tan = function(a){
        return Cmp.div(Cmp.sin(a), Cmp.cos(a));
    };

// 純虚数に対するsin
    Cmp.sini = function(x){
        var a = Cmp.expi(x);
        var b = Cmp.expi(-x);
        var c = new Cmp(2, 0);
        return Cmp.div(Cmp.add(a, b), c);
    };

// 純虚数に対するcos
    Cmp.cosi = function(x){
        var a = Cmp.expi(x);
        var b = Cmp.expi(-x);
        var c = new Cmp(0, 2);
        return Cmp.div(Cmp.sub(a, b), c);
    };


//------------------------
//      双曲線関数
//------------------------


//------------------------
//      べき乗
//------------------------

//べき乗
    Cmp.pow = function(a, b){
        if (a.re === 0 && a.im === 0) {
            if (b.re === 0 && b.im === 0) {
                return undefined;
            } else {
                return new Cmp(0, 0);
            }
        } else {
            var r = Cmp.abs(a);
            var x = Cmp.arg(a);
            var u = b.re;
            var v = b.im;

            var c = Math.pow(r, u);
            var w = new Cmp(-v * x, u * x + v * Math.log(r));
            return Cmp.scl(c, Cmp.exp(w));
        }
    };


}());