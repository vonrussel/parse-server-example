const Utils = require('../Lib/Utils');
const Query = Parse.Query('channels');

// const FIELDS = {
//   'CONTENT'       : 'content',
//   'CONTENT_TYPE'  : 'content_type',
//   'SENDER'        : 'sender',
//   ''
// };

// const FIELDS = {
//   'NAME'        : 'content_type',
//   'META'        : 'sender',
// };


const Channel = Parse.Object.extends('Channel', {

  addUser: function (user) {
    this.set()
  }

}, {
  // class methods
});


function create (options) {
  var Role = new Parse.Role('_' + Utils.randomString());
  var Channel = new Channel();
}





exports.Channel = Channel;
