import Base from '../../../src/lib/resources/Base';

describe('Base', () => {
  describe('#getResourceName', () => {
    it('returns a simple resource name', () => {
      class SimpleResourceName extends Base {
        resource = 'simple'
      }
      const subject = new SimpleResourceName();
      const expectation = 'simple';

      expect(subject.getResourceName()).to.equal(expectation);
    });

    it('splits an complex resource name', () => {
      class ComplexResourceName extends Base {
        resource = 'first_second';
        parentId = 1
      }
      const subject = new ComplexResourceName();
      const expectation = 'first/1/second';

      expect(subject.getResourceName()).to.equal(expectation);
    });

    it('throws on complex resource names without parentId', () => {
      class ThrowingResourceName extends Base {
        resource = 'first_second'
      };

      const subject = new ThrowingResourceName();

      expect(subject.getResourceName).to.throw('Missing parent id');
    });
  });
});
