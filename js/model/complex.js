/**
 * Created by takashima on 15/10/15.
 **/


(function(){


    /**
     * 複素数を表すオブジェクト
     * @class Complex
     * @param re    {Number}    実部
     * @param im    {Number}    虚部
     * @constructor
     */

//複素数オブジェクトの定義
    G.model.Complex = function(re, im){

        //実数
        this.re = re;

        //虚数
        this.im = im;
    };

    //複素数オブジェクトを格納するローカル変数
    var Cmp = G.model.Complex;

//--------------------
//     オブジェクト関数
//--------------------


    /**
     * 複素数を一般的な記法で表示する
     * @method toString
     * @returns {string} 複素数表示
     */
    Cmp.prototype.toString = function(){
        var re = String(this.re.toFixed(2));
        var im = String(this.im.toFixed(2));
        if (im === "0.00") {
            return re;
        } else {
            if (re === "0.00") {
                return im + "i";
            } else {
                return re + " + " + im + "i";
            }
        }
    };


//--------------------
//  複素数特有の基本演算
//--------------------


    /**
     * 実数倍
     * @static
     * @method scl
     * @param k {Number}実数
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.scl = function(k, a){
        return new Cmp(a.re * k, a.im * k);
    };

    /**
     * 絶対値関数
     * @static
     * @method abs
     * @param a {G.model.Complex} 複素数
     * @returns {number}
     */
    Cmp.abs = function(a){
        return Math.sqrt(Cmp.abs2(a));
    };

    /**
     * 絶対値の二乗
     * @static
     * @method abs2
     * @param a {G.model.Complex} 複素数
     * @returns {number}
     */
    Cmp.abs2 = function(a){
        return Math.pow(a.re, 2) + Math.pow(a.im, 2);
    };

    /**
     * 共役複素数
     * @static
     * @method conj
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.conj = function(a){
        return new Cmp(a.re, -a.im);
    };

    /**
     * 逆数
     * @static
     * @method inv
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.inv = function(a){
        var b = new Cmp(a.re, -a.im);
        return Cmp.scl(1 / Cmp.abs2(a), b);

    };

    /**
     * 恒等関数
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex}
     */
    Cmp.id = function(a){
        return a;
    };


//--------------------------------
//    四則演算
//--------------------------------

    /**
     * 加法
     * @static
     * @method add
     * @param a {G.model.Complex} 複素数
     * @param b {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.add = function(a, b){
        return new Cmp(a.re + b.re, a.im + b.im);
    };

    /**
     * 減法
     * @static
     * @method sub
     * @param a {G.model.Complex} 複素数
     * @param b {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.sub = function(a, b){
        return new Cmp(a.re - b.re, a.im - b.im);
    };

    /**
     * 乗法
     * @static
     * @method mlt
     * @param a {G.model.Complex} 複素数
     * @param b {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.mlt = function(a, b){
        return new Cmp(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    };

    /**
     * 除法
     * @static
     * @method div
     * @param a {G.model.Complex} 複素数
     * @param b {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.div = function(a, b){
        return Cmp.mlt(a, Cmp.inv(b));
    };

//---------------------
//    極形式
//---------------------

    /**
     * 偏角
     * @static
     * @method arg
     * @param a {G.model.Complex}複素数
     * @returns {number}
     */
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

    /**
     * 指数関数
     * @static
     * @method exp
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.exp = function(a){
        return Cmp.scl(Math.exp(a.re), Cmp.expi(a.im));
    };

    /**
     * 対数関数
     * @static
     * @method log
     * @param a {G.model.Complex} 複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.log = function(a){
        return new Cmp(Math.log(Cmp.abs(a)), Cmp.arg(a));
    };

    /**
     * 純虚数に対する指数関数
     * @static
     * @method expi
     * @param y {Number} 虚部
     * @returns {G.model.Complex|{}}
     */
    Cmp.expi = function(y){
        return new Cmp(Math.cos(y), Math.sin(y));
    };

//------------------------
//      三角関数
//------------------------

    /**
     * 正弦関数
     * @static
     * @method sin
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.sin = function(a){
        var b = Cmp.scl(Math.sin(a.re), Cmp.cosi(a.im)),
            c = Cmp.scl(Math.cos(a.re), Cmp.sini(a.im));
        return Cmp.add(b, c);

    };

    /**
     * 余弦関数
     * @static
     * @method cos
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.cos = function(a){
        var b = Cmp.scl(Math.cos(a.re), Cmp.cosi(a.im)),
            c = Cmp.scl(Math.sin(a.re), Cmp.sini(a.im));
        return Cmp.add(b, c);
    };

    /**
     * 正接関数
     * @static
     * @method tan
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex|{}}
     */
    Cmp.tan = function(a){
        return Cmp.div(Cmp.sin(a), Cmp.cos(a));
    };

    /**
     * 純虚数に対するsin
     * @static
     * @method sini
     * @param y {Number}    虚部
     * @returns {G.model.Complex|{}}
     */
    Cmp.sini = function(y){
        var a = Cmp.expi(y);
        var b = Cmp.expi(-y);
        var c = new Cmp(2, 0);
        return Cmp.div(Cmp.add(a, b), c);
    };

    /** 純虚数に対するcos
     * @static
     * @method cosi
     * @param y {Number}    虚部
     * @returns {G.model.Complex|{}}
     */
    Cmp.cosi = function(y){
        var a = Cmp.expi(y);
        var b = Cmp.expi(-y);
        var c = new Cmp(0, 2);
        return Cmp.div(Cmp.sub(a, b), c);
    };


//------------------------
//      双曲線関数
//------------------------

    /**
     * 双曲線正弦関数
     * @static
     * @method sinh
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex}
     */
    Cmp.sinh = function(a){
        var b = Cmp.exp(a);
        var c = Cmp.exp(Cmp.scl(-1, a));
        return Cmp.scl(2, Cmp.sub(b, c));
    };


    /**
     * 双曲線余弦関数
     * @static
     * @method cosh
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex}
     */
    Cmp.cosh = function(a){
        var b = Cmp.exp(a);
        var c = Cmp.exp(Cmp.scl(-1, a));
        return Cmp.scl(2, Cmp.sub(b, c));
    };
    /**
     * 双曲線正接関数
     * @static
     * @method tanh
     * @param a {G.model.Complex}   複素数
     * @returns {G.model.Complex}
     */
    Cmp.tanh = function(a){
        var b = Cmp.sinh(a);
        var c = Cmp.cosh(a);
        return Cmp.div(b, c);
    };
//------------------------
//      べき乗
//------------------------

    /**
     * べき乗
     * @static
     * @method pow
     * @param a {G.model.Complex}  複素数
     * @param b {G.model.Complex}  複素数
     * @returns {G.model.Complex}
     */
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