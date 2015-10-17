/**
 * Created by takashima on 15/10/15.
 **/


//+++++++++++++++++++++
// 複素数を表すオブジェクト
//+++++++++++++++++++++

//複素数オブジェクトの定義
var Complex = function (re, im) {

    //実数
    this.re = re;

    //虚数
    this.im = im;
};

//--------------------
//     オブジェクト関数
//--------------------

//toString
Complex.prototype.toString = function () {
    return String(this.re.toFixed(2)) + " + " + String(this.im.toFixed(2)) + "i";
};


//--------------------
//  複素数特有の基本演算
//--------------------


//実数倍
Complex.prototype.scl = function (k) {
    return new Complex(this.re * k, this.im * k);
};

//絶対値
Complex.prototype.abs = function () {
    return Math.sqrt(this.abs2());
};

//絶対値の二乗
Complex.prototype.abs2 = function () {
    return Math.pow(this.re, 2) + Math.pow(this.im, 2);
};

//共役
Complex.prototype.conj = function () {
    return new Complex(this.re, -this.im);
};

//逆数
Complex.prototype.inv = function () {
    var a = new Complex(this.re, -this.im);
    return a.scl(1 / this.abs2());
};


//--------------------------------
//    四則演算
//--------------------------------

//加法
Complex.prototype.add = function (that) {
    return new Complex(this.re + that.re, this.im + that.im);
};

//減法
Complex.prototype.sub = function (that) {
    return new Complex(this.re - that.re, this.im - that.im);
};

//乗法
Complex.prototype.mlt = function (that) {
    return new Complex(this.re * that.re - this.im * that.im, this.re * that.im + this.im * that.re);
};

//除法
Complex.prototype.div = function (that) {
    return this.mlt(that.inv());
};

//---------------------
//    極形式
//---------------------

//偏角
Complex.prototype.arg = function () {
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
Complex.prototype.cos = function () {
    return this.re / this.abs();
};

//正弦
Complex.prototype.sin = function () {
    return this.im / this.abs();
};


//--------------------------------
//    指数関数、対数関数
//--------------------------------

//指数関数
Complex.prototype.exp = function () {
    return Complex.expi(this.im).scl(Math.exp(this.re));
};

//対数関数
Complex.prototype.log = function () {
    return new Complex(Math.log(this.abs()), this.arg());
};

//純虚数に対する指数関数
Complex.expi = function (x) {
    return new Complex(Math.cos(x), Math.sin(x));
};

//------------------------
//      三角関数
//------------------------

//sin
Complex.prototype.sin = function () {
    var a = Complex.cosi(this.im).scl(Math.sin(this.re));
    var b = Complex.sini(this.im).scl(Math.cos(this.re));
    return a.add(b);
}

//cos
Complex.prototype.cos = function () {
    var a = Complex.cosi(this.im).scl(Math.cos(this.re));
    var b = Complex.sini(this.im).scl(Math.sin(this.re));
    return a.add(b);
}

//tan
Complex.prototype.tan = function () {
    return this.sin().div(this.cos());
};

// 純虚数に対するsin
Complex.sini = function (x) {
    var a = Complex.expi(x);
    var b = Complex.expi(-x);
    var c = new Complex(2, 0);
    return a.add(b).div(c);
};

// 純虚数に対するcos
Complex.cosi = function (x) {
    var a = Complex.expi(x);
    var b = Complex.expi(-x);
    var c = new Complex(0, 2);
    return a.sub(b).div(c);
};


//------------------------
//      双曲線関数
//------------------------


//------------------------
//      べき乗
//------------------------

//べき乗
Complex.prototype.pow = function (that) {
    if (this.re === 0 && this.im === 0) {
        if(that.re === 0 && that.im === 0){
            return undefined;
        }else{
            return new Complex(0, 0);
        }
    } else {
        var r = this.abs();
        var x = this.arg();
        var u = that.re;
        var v = that.im;

        var a = Math.pow(r, u);
        var w = new Complex(-v, u * x + v * Math.log(r));
        return w.exp().scl(a);
    }
};