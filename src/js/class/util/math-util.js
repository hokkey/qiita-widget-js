export default class MathUtil {

  static floatFormat(number, n) {
    const _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
  }

}
