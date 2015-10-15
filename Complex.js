/**
 * Created by takashima on 15/10/15.
 **/


//
//
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
    return new Complex(this.re * that.re - this.im * that.im, this.re * that.im + this.im + that.re);
};

//division
Complex.prototype.div = function (that) {
    return new this.mlt(that.inv());
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

//exponential applied to imaginary number
Complex.expi = function (x) {
    return new Complex(Math.cos(x), Math.sin(x));
};

//logarithm
Complex.prototype.log = function () {
    return new Complex(Math.log(this.abs()), this.arg());
};



//------------------------
//
//------------------------


window.onload = function () {
    var a = new Complex(-1, 0), b = new Complex(0, Math.PI);
    var c = b.exp();
    window.alert(c);
};