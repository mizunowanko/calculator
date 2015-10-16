/**
 * Created by takashima on 15/10/15.
 **/


//+++++++++++++++++++++
// 複素数を表すオブジェクト
//+++++++++++++++++++++

//複素数オブジェクトの定義
G.arithmetic.Complex = function (re, im) {


    //実数
    this.re = re;

    //虚数
    this.im = im;
};

//--------------------
//     オブジェクト関数
//--------------------

//toString
G.arithmetic.Complex.prototype.toString = function () {
    return String(this.re.toFixed(2)) + " + " + String(this.im.toFixed(2)) + "i";
};


//--------------------
//  複素数特有の基本演算
//--------------------


//実数倍
G.arithmetic.Complex.prototype.scl = function (k) {
    return new G.arithmetic.Complex(this.re * k, this.im * k);
};

//絶対値
G.arithmetic.Complex.prototype.abs = function () {
    return Math.sqrt(this.abs2());
};

//絶対値の二乗
G.arithmetic.Complex.prototype.abs2 = function () {
    return Math.pow(this.re, 2) + Math.pow(this.im, 2);
};

//共役
G.arithmetic.Complex.prototype.conj = function () {
    return new G.arithmetic.Complex(this.re, -this.im);
};

//逆数
G.arithmetic.Complex.prototype.inv = function () {
    var a = new G.arithmetic.Complex(this.re, -this.im);
    return a.scl(1 / this.abs2());
};


//--------------------------------
//    四則演算
//--------------------------------

//加法
G.arithmetic.Complex.prototype.add = function (that) {
    return new G.arithmetic.Complex(this.re + that.re, this.im + that.im);
};

//減法
G.arithmetic.Complex.prototype.sub = function (that) {
    return new G.arithmetic.Complex(this.re - that.re, this.im - that.im);
};

//乗法
G.arithmetic.Complex.prototype.mlt = function (that) {
    return new G.arithmetic.Complex(this.re * that.re - this.im * that.im, this.re * that.im + this.im * that.re);
};

//除法
G.arithmetic.Complex.prototype.div = function (that) {
    return this.mlt(that.inv());
};

//---------------------
//    極形式
//---------------------

//偏角
G.arithmetic.Complex.prototype.arg = function () {
    var x = this.re;
    var y = this.im;
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

//余弦
G.arithmetic.Complex.prototype.cos = function () {
    return this.re / this.abs();
};

//正弦
G.arithmetic.Complex.prototype.sin = function () {
    return this.im / this.abs();
};


//--------------------------------
//    指数関数、対数関数
//--------------------------------

//指数関数
G.arithmetic.Complex.prototype.exp = function () {
    return G.arithmetic.Complex.expi(this.im).scl(Math.exp(this.re));
};

//対数関数
G.arithmetic.Complex.prototype.log = function () {
    return new G.arithmetic.Complex(Math.log(this.abs()), this.arg());
};

//純虚数に対する指数関数
G.arithmetic.Complex.expi = function (x) {
    return new G.arithmetic.Complex(Math.cos(x), Math.sin(x));
};

//------------------------
//      三角関数
//------------------------

//sin
G.arithmetic.Complex.prototype.sin = function () {
    var a = G.arithmetic.Complex.cosi(this.im).scl(Math.sin(this.re));
    var b = G.arithmetic.Complex.sini(this.im).scl(Math.cos(this.re));
    return a.add(b);
}

//cos
G.arithmetic.Complex.prototype.cos = function () {
    var a = G.arithmetic.Complex.cosi(this.im).scl(Math.cos(this.re));
    var b = G.arithmetic.Complex.sini(this.im).scl(Math.sin(this.re));
    return a.add(b);
}

//tan
G.arithmetic.Complex.prototype.tan = function () {
    return this.sin().div(this.cos());
};

// 純虚数に対するsin
G.arithmetic.Complex.sini = function (x) {
    var a = G.arithmetic.Complex.expi(x);
    var b = G.arithmetic.Complex.expi(-x);
    var c = new G.arithmetic.Complex(2, 0);
    return a.add(b).div(c);
};

// 純虚数に対するcos
G.arithmetic.Complex.cosi = function (x) {
    var a = G.arithmetic.Complex.expi(x);
    var b = G.arithmetic.Complex.expi(-x);
    var c = new G.arithmetic.Complex(0, 2);
    return a.sub(b).div(c);
};


//------------------------
//      双曲線関数
//------------------------


//------------------------
//      べき乗
//------------------------

//べき乗
G.arithmetic.Complex.prototype.pow = function (that) {
    if (this.re === 0 && this.im === 0) {
        if(that.re === 0 && that.im === 0){
            return undefined;
        }else{
            return new G.arithmetic.Complex(0, 0);
        }
    } else {
        var r = this.abs();
        var x = this.arg();
        var u = that.re;
        var v = that.im;

        var a = Math.pow(r, u);
        var w = new G.arithmetic.Complex(-v, u * x + v * Math.log(r));
        return w.exp().scl(a);
    }
};