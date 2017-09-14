/* @flow */
declare var Parse : Object;

import Channel from './Messaging/Channel'
import Message from './Messaging/Message'

var q = new Parse.Query('_User');

q.containedIn('username', ['1', '2']);

q.find({ useMasterKey: true })
.then(users => {
  // Channel.getUsersChannel(users, { type: 'ONE_TO_ONE' })
  //   .then(channel => console.log(channel), err => console.log(err))
  return Channel.create(users, {
    meta: {
      type: 'ONE_TO_ONE',
      hashKeys: ['type']
    }
  });


})
.then(channel => {
  channel.getUsers()
    .then(users => {
      Message.create('testing ' + channel.id)
        .setChannel(channel)
        .setSender(users[0])
        .send()
    }, err => console.log(err))
});

