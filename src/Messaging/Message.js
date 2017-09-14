// @flow
import hash from 'object-hash'
import { randomString } from '../Lib/Utils';
import { emptyFunction, useMasterKey } from '../Constants'
import { createPrivateACL } from '../ACL/ACL'
import Channel from './Channel'


const _className = 'Message';

export const MessageType = {
  'TEXT':     'TEXT',
  'IMAGE':    'IMAGE'
};

export type MessageContentType = $Keys<typeof MessageType>;

// collection schema
export const FieldName = {
  'Content':      'c',
  'ContentType':  'ct'
};


export default class Message extends Parse.Object {
  constructor () {
    super(_className);
  }

  setMeta (meta: Object) : Message {
    this.set('meta', meta);
    return this;
  }

  setSender (user: Object) : Message {
    this.set('sender', user);
    return this;
  }

  setChannel (channel: Channel) : Message {
    // copy ACL from channel
    this.setACL(channel.getACL());
    this.set('channel', channel);
    return this;
  }

  send () : Promise<Message> {
    if (! this.get('channel')) {
      return Promise.reject(new Error('Must have a channel'));
    }

    return Parse.Promise.as()
      .then(() => {
        return this.id ?
          Parse.Promise.as(this) :
          this.save(null, useMasterKey)
      })
  };

  static create (
    content: String,
    options?: { contentType: MessageContentType } = { contentType: MessageType.TEXT }) : Message {
      const message = new Message();

      message.set(FieldName.ContentType, options.contentType);
      message.set(FieldName.Content, content);
      return message;
    };
}

Parse.Object.registerSubclass(_className, Message);

