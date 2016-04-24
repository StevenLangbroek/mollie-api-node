import Payment from '../../../src/lib/objects/Payment';

describe('Payment', () => {
  it('reports open state correctly', () => {
    const payment = new Payment();
    payment.status = 'open';
    const subject = payment.isOpen();
    const expectation = true;

    expect(subject).to.equal(expectation);
  });
});
