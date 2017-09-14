'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldName = exports.MessageType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _Utils = require('../Lib/Utils');

var _Constants = require('../Constants');

var _ACL = require('../ACL/ACL');

var _Channel = require('./Channel');

var _Channel2 = _interopRequireDefault(_Channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _className = 'Message';

var MessageType = exports.MessageType = {
  'TEXT': 'TEXT',
  'IMAGE': 'IMAGE'
};

// collection schema
var FieldName = exports.FieldName = {
  'Content': 'c',
  'ContentType': 'ct'
};

var Message = function (_Parse$Object) {
  _inherits(Message, _Parse$Object);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, _className));
  }

  _createClass(Message, [{
    key: 'setMeta',
    value: function setMeta(meta) {
      this.set('meta', meta);
      return this;
    }
  }, {
    key: 'setSender',
    value: function setSender(user) {
      this.set('sender', user);
      return this;
    }
  }, {
    key: 'setChannel',
    value: function setChannel(channel) {
      // copy ACL from channel
      this.setACL(channel.getACL());
      this.set('channel', channel);
      return this;
    }
  }, {
    key: 'send',
    value: function send() {
      var _this2 = this;

      if (!this.get('channel')) {
        return Promise.reject(new Error('Must have a channel'));
      }

      return Parse.Promise.as().then(function () {
        return _this2.id ? Parse.Promise.as(_this2) : _this2.save(null, _Constants.useMasterKey);
      });
    }
  }], [{
    key: 'create',
    value: function create(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { contentType: MessageType.TEXT };

      var message = new Message();

      message.set(FieldName.ContentType, options.contentType);
      message.set(FieldName.Content, content);
      return message;
    }
  }]);

  return Message;
}(Parse.Object);

exports.default = Message;


Parse.Object.registerSubclass(_className, Message);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2luZy9NZXNzYWdlLmpzIl0sIm5hbWVzIjpbIl9jbGFzc05hbWUiLCJNZXNzYWdlVHlwZSIsIkZpZWxkTmFtZSIsIk1lc3NhZ2UiLCJtZXRhIiwic2V0IiwidXNlciIsImNoYW5uZWwiLCJzZXRBQ0wiLCJnZXRBQ0wiLCJnZXQiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJQYXJzZSIsImFzIiwidGhlbiIsImlkIiwic2F2ZSIsImNvbnRlbnQiLCJvcHRpb25zIiwiY29udGVudFR5cGUiLCJURVhUIiwibWVzc2FnZSIsIkNvbnRlbnRUeXBlIiwiQ29udGVudCIsIk9iamVjdCIsInJlZ2lzdGVyU3ViY2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBLElBQU1BLGFBQWEsU0FBbkI7O0FBRU8sSUFBTUMsb0NBQWM7QUFDekIsVUFBWSxNQURhO0FBRXpCLFdBQVk7QUFGYSxDQUFwQjs7QUFPUDtBQUNPLElBQU1DLGdDQUFZO0FBQ3ZCLGFBQWdCLEdBRE87QUFFdkIsaUJBQWdCO0FBRk8sQ0FBbEI7O0lBTWNDLE87OztBQUNuQixxQkFBZTtBQUFBOztBQUFBLDZHQUNQSCxVQURPO0FBRWQ7Ozs7NEJBRVFJLEksRUFBd0I7QUFDL0IsV0FBS0MsR0FBTCxDQUFTLE1BQVQsRUFBaUJELElBQWpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs4QkFFVUUsSSxFQUF3QjtBQUNqQyxXQUFLRCxHQUFMLENBQVMsUUFBVCxFQUFtQkMsSUFBbkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OytCQUVXQyxPLEVBQTRCO0FBQ3RDO0FBQ0EsV0FBS0MsTUFBTCxDQUFZRCxRQUFRRSxNQUFSLEVBQVo7QUFDQSxXQUFLSixHQUFMLENBQVMsU0FBVCxFQUFvQkUsT0FBcEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzJCQUUwQjtBQUFBOztBQUN6QixVQUFJLENBQUUsS0FBS0csR0FBTCxDQUFTLFNBQVQsQ0FBTixFQUEyQjtBQUN6QixlQUFPQyxRQUFRQyxNQUFSLENBQWUsSUFBSUMsS0FBSixDQUFVLHFCQUFWLENBQWYsQ0FBUDtBQUNEOztBQUVELGFBQU9DLE1BQU1ILE9BQU4sQ0FBY0ksRUFBZCxHQUNKQyxJQURJLENBQ0MsWUFBTTtBQUNWLGVBQU8sT0FBS0MsRUFBTCxHQUNMSCxNQUFNSCxPQUFOLENBQWNJLEVBQWQsUUFESyxHQUVMLE9BQUtHLElBQUwsQ0FBVSxJQUFWLDBCQUZGO0FBR0QsT0FMSSxDQUFQO0FBTUQ7OzsyQkFHQ0MsTyxFQUM2RjtBQUFBLFVBQTdGQyxPQUE2Rix1RUFBN0MsRUFBRUMsYUFBYXBCLFlBQVlxQixJQUEzQixFQUE2Qzs7QUFDM0YsVUFBTUMsVUFBVSxJQUFJcEIsT0FBSixFQUFoQjs7QUFFQW9CLGNBQVFsQixHQUFSLENBQVlILFVBQVVzQixXQUF0QixFQUFtQ0osUUFBUUMsV0FBM0M7QUFDQUUsY0FBUWxCLEdBQVIsQ0FBWUgsVUFBVXVCLE9BQXRCLEVBQStCTixPQUEvQjtBQUNBLGFBQU9JLE9BQVA7QUFDRDs7OztFQTNDZ0NULE1BQU1ZLE07O2tCQUF0QnZCLE87OztBQThDckJXLE1BQU1ZLE1BQU4sQ0FBYUMsZ0JBQWIsQ0FBOEIzQixVQUE5QixFQUEwQ0csT0FBMUMiLCJmaWxlIjoiTWVzc2FnaW5nL01lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IGhhc2ggZnJvbSAnb2JqZWN0LWhhc2gnXG5pbXBvcnQgeyByYW5kb21TdHJpbmcgfSBmcm9tICcuLi9MaWIvVXRpbHMnO1xuaW1wb3J0IHsgZW1wdHlGdW5jdGlvbiwgdXNlTWFzdGVyS2V5IH0gZnJvbSAnLi4vQ29uc3RhbnRzJ1xuaW1wb3J0IHsgY3JlYXRlUHJpdmF0ZUFDTCB9IGZyb20gJy4uL0FDTC9BQ0wnXG5pbXBvcnQgQ2hhbm5lbCBmcm9tICcuL0NoYW5uZWwnXG5cblxuY29uc3QgX2NsYXNzTmFtZSA9ICdNZXNzYWdlJztcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VUeXBlID0ge1xuICAnVEVYVCc6ICAgICAnVEVYVCcsXG4gICdJTUFHRSc6ICAgICdJTUFHRSdcbn07XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VDb250ZW50VHlwZSA9ICRLZXlzPHR5cGVvZiBNZXNzYWdlVHlwZT47XG5cbi8vIGNvbGxlY3Rpb24gc2NoZW1hXG5leHBvcnQgY29uc3QgRmllbGROYW1lID0ge1xuICAnQ29udGVudCc6ICAgICAgJ2MnLFxuICAnQ29udGVudFR5cGUnOiAgJ2N0J1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlIGV4dGVuZHMgUGFyc2UuT2JqZWN0IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKF9jbGFzc05hbWUpO1xuICB9XG5cbiAgc2V0TWV0YSAobWV0YTogT2JqZWN0KSA6IE1lc3NhZ2Uge1xuICAgIHRoaXMuc2V0KCdtZXRhJywgbWV0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRTZW5kZXIgKHVzZXI6IE9iamVjdCkgOiBNZXNzYWdlIHtcbiAgICB0aGlzLnNldCgnc2VuZGVyJywgdXNlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRDaGFubmVsIChjaGFubmVsOiBDaGFubmVsKSA6IE1lc3NhZ2Uge1xuICAgIC8vIGNvcHkgQUNMIGZyb20gY2hhbm5lbFxuICAgIHRoaXMuc2V0QUNMKGNoYW5uZWwuZ2V0QUNMKCkpO1xuICAgIHRoaXMuc2V0KCdjaGFubmVsJywgY2hhbm5lbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZW5kICgpIDogUHJvbWlzZTxNZXNzYWdlPiB7XG4gICAgaWYgKCEgdGhpcy5nZXQoJ2NoYW5uZWwnKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTXVzdCBoYXZlIGEgY2hhbm5lbCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUGFyc2UuUHJvbWlzZS5hcygpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkID9cbiAgICAgICAgICBQYXJzZS5Qcm9taXNlLmFzKHRoaXMpIDpcbiAgICAgICAgICB0aGlzLnNhdmUobnVsbCwgdXNlTWFzdGVyS2V5KVxuICAgICAgfSlcbiAgfTtcblxuICBzdGF0aWMgY3JlYXRlIChcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgb3B0aW9ucz86IHsgY29udGVudFR5cGU6IE1lc3NhZ2VDb250ZW50VHlwZSB9ID0geyBjb250ZW50VHlwZTogTWVzc2FnZVR5cGUuVEVYVCB9KSA6IE1lc3NhZ2Uge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKCk7XG5cbiAgICAgIG1lc3NhZ2Uuc2V0KEZpZWxkTmFtZS5Db250ZW50VHlwZSwgb3B0aW9ucy5jb250ZW50VHlwZSk7XG4gICAgICBtZXNzYWdlLnNldChGaWVsZE5hbWUuQ29udGVudCwgY29udGVudCk7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xufVxuXG5QYXJzZS5PYmplY3QucmVnaXN0ZXJTdWJjbGFzcyhfY2xhc3NOYW1lLCBNZXNzYWdlKTtcblxuIl19
