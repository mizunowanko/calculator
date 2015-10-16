/**
 * Created by takashima on 15/10/15.
 **/


//
//複素数を表す関数
//


//Complex Class
var Complex;
Complex = function (re, im) {


    //real number
    this.re = re;

    //imaginary number
    this.im = im;
};

//--------------------
//     Object
//--------------------

Complex.prototype.toString = function () {
    return String(this.re.toFixed(2)) + " + " + String(this.im.toFixed(2)) + "i";
};


//--------------------
//    basic operations
//--------------------


//scala multiple
Complex.prototype.scl = function (k) {
    return new Complex(this.re * k, this.im * k);
};

//abstract
Complex.prototype.abs = function () {
    return Math.sqrt(this.abs2());
};

//square of abstract
Complex.prototype.abs2 = function () {
    return Math.pow(this.re, 2) + Math.pow(this.im, 2);
};

//conjgate
Complex.prototype.conj = function () {
    return new Complex(this.re, -this.im);
};

//inverse
Complex.prototype.inv = function () {
    var a = new Complex(this.re, -this.im);
    return a.scl(1 / this.abs2());
};


//--------------------------------
//    Four arithmetic operations
//--------------------------------

//add
Complex.prototype.add = function (that) {
    return new Complex(this.re + that.re, this.im + that.im);
};

//subtract
Complex.prototype.sub = function (that) {
    return new Complex(this.re - that.re, this.im - that.im);
};

//multiple
Complex.prototype.mlt = function (that) {
    return new Complex(this.re * that.re - this.im * that.im, this.re * that.im + this.im * that.re);
};

//division
Complex.prototype.div = function (that) {
    return this.mlt(that.inv());
};

//---------------------
//    polar form
//---------------------

//declination
Complex.prototype.arg = function () {
    return this.re > 0 ? Math.atan(this.im / this.re) : Math.atan(this.im / this.re) + Math.PI;
};

//cos
Complex.prototype.cos = function () {
    return this.re / this.abs();
};

//sin
Complex.prototype.sin = function () {
    return this.im / this.abs();
};


//--------------------------------
//    exponential & logarithm
//--------------------------------

//exponential
Complex.prototype.exp = function () {
    return Complex.expi(this.im).scl(Math.exp(this.re));
};

//logarithm
Complex.prototype.log = function () {
    return new Complex(Math.log(this.abs()), this.arg());
};

//exponential applied to imaginary number
Complex.expi = function (x) {
    return new Complex(Math.cos(x), Math.sin(x));
};

//------------------------
//      trigonometric
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


// sin applied to imaginary number
Complex.sini = function (x) {
    var a = Complex.expi(x);
    var b = Complex.expi(-x);
    var c = new Complex(2, 0);
    return a.add(b).div(c);
};

// cos applied to imaginary number
Complex.cosi = function (x) {
    var a = Complex.expi(x);
    var b = Complex.expi(-x);
    var c = new Complex(0, 2);
    return a.sub(b).div(c);
};


//------------------------
//     test
//------------------------


window.onload = function () {
    var a = new Complex(1, 1);
    var b = new Complex(Math.PI, 0);
    var c = b.cos();
    var d = Complex.sini(Math.PI);
    window.alert(c);
};