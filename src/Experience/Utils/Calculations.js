export default class Calculations {
    constructor() {
        this.abs = Math.abs;
        this.ceil = Math.ceil;
        this.exp = Math.exp;
        this.floor = Math.floor;
        this.log = Math.log;
        this.pow = Math.pow;
        this.sqrt = Math.sqrt;
    }
   

    constrain(n, low, high) {
        return Math.max(Math.min(n, high), low);
    }

    dist = function (...args) {
        if (args.length === 4) {
            //2D
            return Math.hypot(args[2] - args[0], args[3] - args[1]);
        } else if (args.length === 6) {
            //3D
            return Math.hypot(args[3] - args[0], args[4] - args[1], args[5] - args[2]);
        }
    }

    lerp(start, stop, amt) {
        return amt * (stop - start) + start;
    }

    mag(x, y) {
        return Math.hypot(x, y);
    };


    map(n, start1, stop1, start2, stop2, withinBounds) {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    }


    max(...args) {
        const findMax = arr => Math.max(...arr);

        if (Array.isArray(args[0])) {
            return findMax(args[0]);
        } else {
            return findMax(args);
        }
    }


    min(...args) {
        const findMin = arr => Math.min(...arr);

        if (Array.isArray(args[0])) {
            return findMin(args[0]);
        } else {
            return findMin(args);
        }
    }

    norm(n, start, stop) {
        return this.map(n, start, stop, 0, 1);
    }

    round(n, decimals) {
        if (!decimals) {
            return Math.round(n);
        }
        const multiplier = Math.pow(10, decimals);
        return Math.round(n * multiplier) / multiplier;
    }


    sq(n) { 
        return n * n;
    }

    fract(toConvert) {
        let sign = 0;
        let num = Number(toConvert);
        if (isNaN(num) || Math.abs(num) === Infinity) {
            return num;
        } else if (num < 0) {
            num = -num;
            sign = 1;
        }
        if (String(num).includes('.') && !String(num).includes('e')) {
            let toFract = String(num);
            toFract = Number('0' + toFract.slice(toFract.indexOf('.')));
            return Math.abs(sign - toFract);
        } else if (num < 1) {
            return Math.abs(sign - num);
        } else {
            return 0;
        }
    }
}