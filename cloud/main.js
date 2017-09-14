'use strict';

var _Channel = require('./Messaging/Channel');

var _Channel2 = _interopRequireDefault(_Channel);

var _Message = require('./Messaging/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var q = new Parse.Query('_User');


q.containedIn('username', ['1', '2']);

q.find({ useMasterKey: true }).then(function (users) {
  // Channel.getUsersChannel(users, { type: 'ONE_TO_ONE' })
  //   .then(channel => console.log(channel), err => console.log(err))
  return _Channel2.default.create(users, {
    meta: {
      type: 'ONE_TO_ONE',
      hashKeys: ['type']
    }
  });
}).then(function (channel) {
  channel.getUsers().then(function (users) {
    _Message2.default.create('testing ' + channel.id).setChannel(channel).setSender(users[0]).send();
  }, function (err) {
    return console.log(err);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicSIsIlBhcnNlIiwiUXVlcnkiLCJjb250YWluZWRJbiIsImZpbmQiLCJ1c2VNYXN0ZXJLZXkiLCJ0aGVuIiwiY3JlYXRlIiwidXNlcnMiLCJtZXRhIiwidHlwZSIsImhhc2hLZXlzIiwiY2hhbm5lbCIsImdldFVzZXJzIiwiaWQiLCJzZXRDaGFubmVsIiwic2V0U2VuZGVyIiwic2VuZCIsImNvbnNvbGUiLCJsb2ciLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsSUFBSSxJQUFJQyxNQUFNQyxLQUFWLENBQWdCLE9BQWhCLENBQVI7OztBQUVBRixFQUFFRyxXQUFGLENBQWMsVUFBZCxFQUEwQixDQUFDLEdBQUQsRUFBTSxHQUFOLENBQTFCOztBQUVBSCxFQUFFSSxJQUFGLENBQU8sRUFBRUMsY0FBYyxJQUFoQixFQUFQLEVBQ0NDLElBREQsQ0FDTSxpQkFBUztBQUNiO0FBQ0E7QUFDQSxTQUFPLGtCQUFRQyxNQUFSLENBQWVDLEtBQWYsRUFBc0I7QUFDM0JDLFVBQU07QUFDSkMsWUFBTSxZQURGO0FBRUpDLGdCQUFVLENBQUMsTUFBRDtBQUZOO0FBRHFCLEdBQXRCLENBQVA7QUFRRCxDQVpELEVBYUNMLElBYkQsQ0FhTSxtQkFBVztBQUNmTSxVQUFRQyxRQUFSLEdBQ0dQLElBREgsQ0FDUSxpQkFBUztBQUNiLHNCQUFRQyxNQUFSLENBQWUsYUFBYUssUUFBUUUsRUFBcEMsRUFDR0MsVUFESCxDQUNjSCxPQURkLEVBRUdJLFNBRkgsQ0FFYVIsTUFBTSxDQUFOLENBRmIsRUFHR1MsSUFISDtBQUlELEdBTkgsRUFNSztBQUFBLFdBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsR0FBWixDQUFQO0FBQUEsR0FOTDtBQU9ELENBckJEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuZGVjbGFyZSB2YXIgUGFyc2UgOiBPYmplY3Q7XG5cbmltcG9ydCBDaGFubmVsIGZyb20gJy4vTWVzc2FnaW5nL0NoYW5uZWwnXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL01lc3NhZ2luZy9NZXNzYWdlJ1xuXG52YXIgcSA9IG5ldyBQYXJzZS5RdWVyeSgnX1VzZXInKTtcblxucS5jb250YWluZWRJbigndXNlcm5hbWUnLCBbJzEnLCAnMiddKTtcblxucS5maW5kKHsgdXNlTWFzdGVyS2V5OiB0cnVlIH0pXG4udGhlbih1c2VycyA9PiB7XG4gIC8vIENoYW5uZWwuZ2V0VXNlcnNDaGFubmVsKHVzZXJzLCB7IHR5cGU6ICdPTkVfVE9fT05FJyB9KVxuICAvLyAgIC50aGVuKGNoYW5uZWwgPT4gY29uc29sZS5sb2coY2hhbm5lbCksIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICByZXR1cm4gQ2hhbm5lbC5jcmVhdGUodXNlcnMsIHtcbiAgICBtZXRhOiB7XG4gICAgICB0eXBlOiAnT05FX1RPX09ORScsXG4gICAgICBoYXNoS2V5czogWyd0eXBlJ11cbiAgICB9XG4gIH0pO1xuXG5cbn0pXG4udGhlbihjaGFubmVsID0+IHtcbiAgY2hhbm5lbC5nZXRVc2VycygpXG4gICAgLnRoZW4odXNlcnMgPT4ge1xuICAgICAgTWVzc2FnZS5jcmVhdGUoJ3Rlc3RpbmcgJyArIGNoYW5uZWwuaWQpXG4gICAgICAgIC5zZXRDaGFubmVsKGNoYW5uZWwpXG4gICAgICAgIC5zZXRTZW5kZXIodXNlcnNbMF0pXG4gICAgICAgIC5zZW5kKClcbiAgICB9LCBlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbn0pO1xuXG4iXX0=
