import bindAll from 'lodash/bindAll';

const methods = [
  'copy',
  'create',
  'read',
  'update',
  'delete',
  'all',
  'getResourceName',
  'withParent',
  'withParentId'
];

export default class Base {
  api = null;
  resource = 'unknown';
  object = () => {};
  parentId = null;

  constructor(api) {
    this.api = api;

    bindAll(this, methods);
  }

  copy(body, object) {
    Object
      .keys(object)
      .filter(key => typeof object[key] !== 'function')
      .forEach(key => object[key] = body[key]);

    return object;
  }

  create(data, callback) {
    this.api.callRest(
      'POST',
      this.getResourceName(),
      null,
      data,
      (body) => {
        if (body.error) return callback(body);
        callback(
          this.copy(body, new this.object())
        );
      }
    );
  }

  read(id, callback) {
    this.api.callRest(
      'GET',
      this.getResourceName(),
      id,
      null, (body) => {
        if (body.error) return callback(body);
        callback(this.copy(body, new this.object()));
      }
    );
  }

  update(id, data, callback) {
    this.api.callRest(
      'POST',
      this.getResourceName(),
      id,
      data,
      (body) => {
        if (body.error) return callback(body);
        callback(this.copy(body, new this.object()));
      }
    );
  }

  delete(id, callback) {
    this.api.callRest(
      'DELETE',
      this.getResourceName(),
      id,
      null,
      (body) => {
        if (body.error) return callback(body);
        callback(this.copy(body, new this.object()));
      }
    );
  }

  all(callback) {
    this.api.callRest(
      'GET',
      this.getResourceName(),
      null,
      null,
      (body) => {
        if (body.error) return callback(body);

        const list = new List();
        list.totalCount = body.totalCount;
        list.offset = body.offset;
        list.links = body.links;

        callback(Object.keys(body.data).reduce((acc, key) => {
          return list.concat(
            this.copy(body.data[item], new this.object())
          )
        }, list));
      }
    );
  }

  getResourceName() {
    if (this.resource.indexOf('_') !== -1) {
      if (!this.parentId) {
        throw new Error('Missing parent id');
      }
      const parts = this.resource.split('_');
      return `${parts[0]}/${this.parentId}/${parts[1]}`;
    }
    return this.resource;
  }

  withParent(parent) {
    return this.withParentId(parent.id);
  }

  withParentId(parentId) {
    this.parentId = parentId;
    return this;
  }
}
