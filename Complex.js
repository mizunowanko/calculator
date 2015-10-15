/**
 * Created by takashima on 15/10/15.
 */



//Complex Class
var Complex;
Complex = function (re, im) {

    //real number
    this.re = re;

    //imaginary number
    this.im = im;

    //scala multiple
    this.scl = function (k) {
        return new Complex(this.re * k, this.im * k);
    };

    //abstract
    this.abs = function () {
        return Math.sqrt(this.abs2());
    };

    //square of abstract
    this.abs2 = function () {
        return Math.pow(this.re, 2) + Math.pow(this.im, 2);
    };

    //declination
    this.arg = function () {
        return Math.atan(this.im / this.re);
    };

    //conjgate
    this.conj = function () {
        return new Complex(this.re, -this.im);
    };

    //inverse
    this.inv = function () {
        var a = new Complex(this.re, -this.im);
        return a.scl(1 / this.abs2());
    };
};


//add
Complex.add = function (a, b) {
    return new Complex(a.re + b.re, a.im + b.im);
};

//subtract
Complex.sub = function (a, b) {
    return new Complex(a.re - b.re, a.im - b.im);
};

//multiple
Complex.mlt = function (a, b) {
    return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im + b.re);
};

//division
Complex.div = function (a, b) {
    return new Complex.mlt(a, b.inv());
};


window.onload = function () {
    var a = new Complex(1, -1), b = new Complex(2, 3);
    var c = Complex.div(a, b);
    window.alert(Math.pow(2, -3.3));
};