export default class Method {
  static IDEAL = 'ideal';
  static CREDITCARD = 'creditcard';
  static MISTERCASH = 'mistercash';
  static SOFORT = 'sofort';
  static BANKTRANSFER = 'banktransfer';
  static DIRECTDEBIT = 'directdebit';
  static BITCOIN = 'bitcoin';
  static PAYPAL = 'paypal';
  static BELFIUS = 'belfius';
  static PAYSAFECARD = 'paysafecard';
  static PODIUMCADEAUKAART = 'podiumcadeaukaart';

  resource = 'method';
  id = null;
  description = null;
  amount = {
    minimum: null,
    maximum: null,
  };
  image = {
    normal: null,
    bigger: null,
  };

  getAmount(boundary) {
    return this.amount[boundary] || '0';
  }

  getMinimumAmount() {
    return parseFloat(this.getAmount('minimum'));
  }

  getMaximumAmount() {
    return parseFloat(this.getAmount('maximum'));
  }
}
