// @flow
import hash from 'object-hash'
import { randomString } from '../Lib/Utils';
import { emptyFunction, useMasterKey } from '../Constants'
import { createPrivateACL, createPublicACL } from '../ACL/ACL'
import _ from 'lodash'


const _className = 'Channel';

// collection schema
export const FieldName = {
  'MessageChannel':     'mc',
  'Hash':               'h',
  'Meta':               'mt'
};




export default class Channel extends Parse.Object {
  constructor () {
    super(_className);
  }

  getUsers (): Promise<Array<Object>> {
    const q = new Parse.Query(Parse.Role);
    q.equalTo(FieldName.MessageChannel, this.relation);

    return q.first(useMasterKey)
      .then(role =>
        role ?
          role.getUsers().query().find(useMasterKey) :
          Parse.Promise.as([])
      )
  }

  static createHash (users: Array<Object>, meta?: Object): String {
    let h = users.map(u => u.id);
    if (meta) {
      const toHash = Array.isArray(meta.hashKeys) ?
        _.pick(meta, meta.hashKeys) : null;

      if (! _.isEmpty(toHash))  h.push(toHash);
    }

    return hash(h, { unorderedArrays: true })
  };

  static create (users: Array<Object>, options?: { meta?: Object } = {}): Promise<Channel> {
    let meta;

    if (options) {
      meta = options.meta;
    }

    // check existing
    return this.getUsersChannel(users, meta)
      .then(channel => {
        if (! channel) {
          // proceed creation
          return this._createChannel(users, options);
        }

        return Parse.Promise.as(channel);
      })
  };

  static getUsersChannel (users: Array<Object>, meta?: Object = {}): Promise<Channel> {
    const q = new Parse.Query(Channel);
    const hash = this.createHash(users, meta);

    q.equalTo(FieldName.Hash, hash);
    return q.first(useMasterKey);
  };

  static _createChannel (users: Array<Object>, options?: { meta?: Object } = {}): Promise<Channel> { 
    let channel = new Channel();
    channel.set(FieldName.Hash, this.createHash(users, options.meta));

    if (options.meta) {
      channel.set(FieldName.Meta, options.meta);
    }

    return channel
      .save(null, useMasterKey)
      .then(channel => {
        return this._attachRole(channel, users)
          .then(role => Parse.Promise.as([ channel, role ]))
      })
      // assign role and set ACL
      .then(args => {
        const [ channel, role ] = args;
        const acl = options.public ? createPublicACL() : createPrivateACL();

        acl.setRoleWriteAccess(role, true);
        acl.setRoleReadAccess(role, true);
        channel.setACL(acl);

        return channel.save(null, useMasterKey)
      })
  };

  // returns Role
  static _attachRole (channel: Channel, users: Array<Object>): Promise<Object> {
    // create role for this channel that handles
    // Role ACL for each users in this channel
    const name = `_${FieldName.MessageChannel}_${randomString()}`;
    const role = new Parse.Role(name, createPrivateACL());
    users.forEach(user => role.getUsers().add(user));

    return role
      .save(null, useMasterKey)
      .then(role => {
        // add message channel reference
        const relation = role.relation(FieldName.MessageChannel);
        relation.add(channel);
        return role.save(null, useMasterKey)
      })
  };

}

Parse.Object.registerSubclass(_className, Channel);
