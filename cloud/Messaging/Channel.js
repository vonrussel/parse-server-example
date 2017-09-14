'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldName = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _Utils = require('../Lib/Utils');

var _Constants = require('../Constants');

var _ACL = require('../ACL/ACL');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _className = 'Channel';

// collection schema
var FieldName = exports.FieldName = {
  'MessageChannel': 'mc',
  'Hash': 'h',
  'Meta': 'mt'
};

var Channel = function (_Parse$Object) {
  _inherits(Channel, _Parse$Object);

  function Channel() {
    _classCallCheck(this, Channel);

    return _possibleConstructorReturn(this, (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, _className));
  }

  _createClass(Channel, [{
    key: 'getUsers',
    value: function getUsers() {
      var q = new Parse.Query(Parse.Role);
      q.equalTo(FieldName.MessageChannel, this.relation);

      return q.first(_Constants.useMasterKey).then(function (role) {
        return role ? role.getUsers().query().find(_Constants.useMasterKey) : Parse.Promise.as([]);
      });
    }
  }], [{
    key: 'createHash',
    value: function createHash(users, meta) {
      var h = users.map(function (u) {
        return u.id;
      });
      if (meta) {
        var toHash = Array.isArray(meta.hashKeys) ? _lodash2.default.pick(meta, meta.hashKeys) : null;

        if (!_lodash2.default.isEmpty(toHash)) h.push(toHash);
      }

      return (0, _objectHash2.default)(h, { unorderedArrays: true });
    }
  }, {
    key: 'create',
    value: function create(users) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var meta = void 0;

      if (options) {
        meta = options.meta;
      }

      // check existing
      return this.getUsersChannel(users, meta).then(function (channel) {
        if (!channel) {
          // proceed creation
          return _this2._createChannel(users, options);
        }

        return Parse.Promise.as(channel);
      });
    }
  }, {
    key: 'getUsersChannel',
    value: function getUsersChannel(users) {
      var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var q = new Parse.Query(Channel);
      var hash = this.createHash(users, meta);

      q.equalTo(FieldName.Hash, hash);
      return q.first(_Constants.useMasterKey);
    }
  }, {
    key: '_createChannel',
    value: function _createChannel(users) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var channel = new Channel();
      channel.set(FieldName.Hash, this.createHash(users, options.meta));

      if (options.meta) {
        channel.set(FieldName.Meta, options.meta);
      }

      return channel.save(null, _Constants.useMasterKey).then(function (channel) {
        return _this3._attachRole(channel, users).then(function (role) {
          return Parse.Promise.as([channel, role]);
        });
      })
      // assign role and set ACL
      .then(function (args) {
        var _args = _slicedToArray(args, 2),
            channel = _args[0],
            role = _args[1];

        var acl = options.public ? (0, _ACL.createPublicACL)() : (0, _ACL.createPrivateACL)();

        acl.setRoleWriteAccess(role, true);
        acl.setRoleReadAccess(role, true);
        channel.setACL(acl);

        return channel.save(null, _Constants.useMasterKey);
      });
    }
  }, {
    key: '_attachRole',


    // returns Role
    value: function _attachRole(channel, users) {
      // create role for this channel that handles
      // Role ACL for each users in this channel
      var name = '_' + FieldName.MessageChannel + '_' + (0, _Utils.randomString)();
      var role = new Parse.Role(name, (0, _ACL.createPrivateACL)());
      users.forEach(function (user) {
        return role.getUsers().add(user);
      });

      return role.save(null, _Constants.useMasterKey).then(function (role) {
        // add message channel reference
        var relation = role.relation(FieldName.MessageChannel);
        relation.add(channel);
        return role.save(null, _Constants.useMasterKey);
      });
    }
  }]);

  return Channel;
}(Parse.Object);

exports.default = Channel;


Parse.Object.registerSubclass(_className, Channel);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2luZy9DaGFubmVsLmpzIl0sIm5hbWVzIjpbIl9jbGFzc05hbWUiLCJGaWVsZE5hbWUiLCJDaGFubmVsIiwicSIsIlBhcnNlIiwiUXVlcnkiLCJSb2xlIiwiZXF1YWxUbyIsIk1lc3NhZ2VDaGFubmVsIiwicmVsYXRpb24iLCJmaXJzdCIsInRoZW4iLCJyb2xlIiwiZ2V0VXNlcnMiLCJxdWVyeSIsImZpbmQiLCJQcm9taXNlIiwiYXMiLCJ1c2VycyIsIm1ldGEiLCJoIiwibWFwIiwidSIsImlkIiwidG9IYXNoIiwiQXJyYXkiLCJpc0FycmF5IiwiaGFzaEtleXMiLCJwaWNrIiwiaXNFbXB0eSIsInB1c2giLCJ1bm9yZGVyZWRBcnJheXMiLCJvcHRpb25zIiwiZ2V0VXNlcnNDaGFubmVsIiwiY2hhbm5lbCIsIl9jcmVhdGVDaGFubmVsIiwiaGFzaCIsImNyZWF0ZUhhc2giLCJIYXNoIiwic2V0IiwiTWV0YSIsInNhdmUiLCJfYXR0YWNoUm9sZSIsImFyZ3MiLCJhY2wiLCJwdWJsaWMiLCJzZXRSb2xlV3JpdGVBY2Nlc3MiLCJzZXRSb2xlUmVhZEFjY2VzcyIsInNldEFDTCIsIm5hbWUiLCJmb3JFYWNoIiwiYWRkIiwidXNlciIsIk9iamVjdCIsInJlZ2lzdGVyU3ViY2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTUEsYUFBYSxTQUFuQjs7QUFFQTtBQUNPLElBQU1DLGdDQUFZO0FBQ3ZCLG9CQUFzQixJQURDO0FBRXZCLFVBQXNCLEdBRkM7QUFHdkIsVUFBc0I7QUFIQyxDQUFsQjs7SUFTY0MsTzs7O0FBQ25CLHFCQUFlO0FBQUE7O0FBQUEsNkdBQ1BGLFVBRE87QUFFZDs7OzsrQkFFbUM7QUFDbEMsVUFBTUcsSUFBSSxJQUFJQyxNQUFNQyxLQUFWLENBQWdCRCxNQUFNRSxJQUF0QixDQUFWO0FBQ0FILFFBQUVJLE9BQUYsQ0FBVU4sVUFBVU8sY0FB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akQ7O0FBRUFELFlBQUlFLGtCQUFKLENBQXVCbEMsSUFBdkIsRUFBNkIsSUFBN0I7QUFDQWdDLFlBQUlHLGlCQUFKLENBQXNCbkMsSUFBdEIsRUFBNEIsSUFBNUI7QUFDQXNCLGdCQUFRYyxNQUFSLENBQWVKLEdBQWY7O0FBRUEsZUFBT1YsUUFBUU8sSUFBUixDQUFhLElBQWIsMEJBQVA7QUFDRCxPQWhCSSxDQUFQO0FBaUJEOzs7OztBQUVEO2dDQUNvQlAsTyxFQUFrQmhCLEssRUFBdUM7QUFDM0U7QUFDQTtBQUNBLFVBQU0rQixhQUFXaEQsVUFBVU8sY0FBckIsU0FBdUMsMEJBQTdDO0FBQ0EsVUFBTUksT0FBTyxJQUFJUixNQUFNRSxJQUFWLENBQWUyQyxJQUFmLEVBQXFCLDRCQUFyQixDQUFiO0FBQ0EvQixZQUFNZ0MsT0FBTixDQUFjO0FBQUEsZUFBUXRDLEtBQUtDLFFBQUwsR0FBZ0JzQyxHQUFoQixDQUFvQkMsSUFBcEIsQ0FBUjtBQUFBLE9BQWQ7O0FBRUEsYUFBT3hDLEtBQ0o2QixJQURJLENBQ0MsSUFERCwyQkFFSjlCLElBRkksQ0FFQyxnQkFBUTtBQUNaO0FBQ0EsWUFBTUYsV0FBV0csS0FBS0gsUUFBTCxDQUFjUixVQUFVTyxjQUF4QixDQUFqQjtBQUNBQyxpQkFBUzBDLEdBQVQsQ0FBYWpCLE9BQWI7QUFDQSxlQUFPdEIsS0FBSzZCLElBQUwsQ0FBVSxJQUFWLDBCQUFQO0FBQ0QsT0FQSSxDQUFQO0FBUUQ7Ozs7RUFuR2tDckMsTUFBTWlELE07O2tCQUF0Qm5ELE87OztBQXVHckJFLE1BQU1pRCxNQUFOLENBQWFDLGdCQUFiLENBQThCdEQsVUFBOUIsRUFBMENFLE9BQTFDIiwiZmlsZSI6Ik1lc3NhZ2luZy9DaGFubmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBoYXNoIGZyb20gJ29iamVjdC1oYXNoJ1xuaW1wb3J0IHsgcmFuZG9tU3RyaW5nIH0gZnJvbSAnLi4vTGliL1V0aWxzJztcbmltcG9ydCB7IGVtcHR5RnVuY3Rpb24sIHVzZU1hc3RlcktleSB9IGZyb20gJy4uL0NvbnN0YW50cydcbmltcG9ydCB7IGNyZWF0ZVByaXZhdGVBQ0wsIGNyZWF0ZVB1YmxpY0FDTCB9IGZyb20gJy4uL0FDTC9BQ0wnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cblxuY29uc3QgX2NsYXNzTmFtZSA9ICdDaGFubmVsJztcblxuLy8gY29sbGVjdGlvbiBzY2hlbWFcbmV4cG9ydCBjb25zdCBGaWVsZE5hbWUgPSB7XG4gICdNZXNzYWdlQ2hhbm5lbCc6ICAgICAnbWMnLFxuICAnSGFzaCc6ICAgICAgICAgICAgICAgJ2gnLFxuICAnTWV0YSc6ICAgICAgICAgICAgICAgJ210J1xufTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbm5lbCBleHRlbmRzIFBhcnNlLk9iamVjdCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcihfY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGdldFVzZXJzICgpOiBQcm9taXNlPEFycmF5PE9iamVjdD4+IHtcbiAgICBjb25zdCBxID0gbmV3IFBhcnNlLlF1ZXJ5KFBhcnNlLlJvbGUpO1xuICAgIHEuZXF1YWxUbyhGaWVsZE5hbWUuTWVzc2FnZUNoYW5uZWwsIHRoaXMucmVsYXRpb24pO1xuXG4gICAgcmV0dXJuIHEuZmlyc3QodXNlTWFzdGVyS2V5KVxuICAgICAgLnRoZW4ocm9sZSA9PlxuICAgICAgICByb2xlID9cbiAgICAgICAgICByb2xlLmdldFVzZXJzKCkucXVlcnkoKS5maW5kKHVzZU1hc3RlcktleSkgOlxuICAgICAgICAgIFBhcnNlLlByb21pc2UuYXMoW10pXG4gICAgICApXG4gIH1cblxuICBzdGF0aWMgY3JlYXRlSGFzaCAodXNlcnM6IEFycmF5PE9iamVjdD4sIG1ldGE/OiBPYmplY3QpOiBTdHJpbmcge1xuICAgIGxldCBoID0gdXNlcnMubWFwKHUgPT4gdS5pZCk7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIGNvbnN0IHRvSGFzaCA9IEFycmF5LmlzQXJyYXkobWV0YS5oYXNoS2V5cykgP1xuICAgICAgICBfLnBpY2sobWV0YSwgbWV0YS5oYXNoS2V5cykgOiBudWxsO1xuXG4gICAgICBpZiAoISBfLmlzRW1wdHkodG9IYXNoKSkgIGgucHVzaCh0b0hhc2gpO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoKGgsIHsgdW5vcmRlcmVkQXJyYXlzOiB0cnVlIH0pXG4gIH07XG5cbiAgc3RhdGljIGNyZWF0ZSAodXNlcnM6IEFycmF5PE9iamVjdD4sIG9wdGlvbnM/OiB7IG1ldGE/OiBPYmplY3QgfSA9IHt9KTogUHJvbWlzZTxDaGFubmVsPiB7XG4gICAgbGV0IG1ldGE7XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgbWV0YSA9IG9wdGlvbnMubWV0YTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBleGlzdGluZ1xuICAgIHJldHVybiB0aGlzLmdldFVzZXJzQ2hhbm5lbCh1c2VycywgbWV0YSlcbiAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICBpZiAoISBjaGFubmVsKSB7XG4gICAgICAgICAgLy8gcHJvY2VlZCBjcmVhdGlvblxuICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVDaGFubmVsKHVzZXJzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQYXJzZS5Qcm9taXNlLmFzKGNoYW5uZWwpO1xuICAgICAgfSlcbiAgfTtcblxuICBzdGF0aWMgZ2V0VXNlcnNDaGFubmVsICh1c2VyczogQXJyYXk8T2JqZWN0PiwgbWV0YT86IE9iamVjdCA9IHt9KTogUHJvbWlzZTxDaGFubmVsPiB7XG4gICAgY29uc3QgcSA9IG5ldyBQYXJzZS5RdWVyeShDaGFubmVsKTtcbiAgICBjb25zdCBoYXNoID0gdGhpcy5jcmVhdGVIYXNoKHVzZXJzLCBtZXRhKTtcblxuICAgIHEuZXF1YWxUbyhGaWVsZE5hbWUuSGFzaCwgaGFzaCk7XG4gICAgcmV0dXJuIHEuZmlyc3QodXNlTWFzdGVyS2V5KTtcbiAgfTtcblxuICBzdGF0aWMgX2NyZWF0ZUNoYW5uZWwgKHVzZXJzOiBBcnJheTxPYmplY3Q+LCBvcHRpb25zPzogeyBtZXRhPzogT2JqZWN0IH0gPSB7fSk6IFByb21pc2U8Q2hhbm5lbD4geyBcbiAgICBsZXQgY2hhbm5lbCA9IG5ldyBDaGFubmVsKCk7XG4gICAgY2hhbm5lbC5zZXQoRmllbGROYW1lLkhhc2gsIHRoaXMuY3JlYXRlSGFzaCh1c2Vycywgb3B0aW9ucy5tZXRhKSk7XG5cbiAgICBpZiAob3B0aW9ucy5tZXRhKSB7XG4gICAgICBjaGFubmVsLnNldChGaWVsZE5hbWUuTWV0YSwgb3B0aW9ucy5tZXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbFxuICAgICAgLnNhdmUobnVsbCwgdXNlTWFzdGVyS2V5KVxuICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2hSb2xlKGNoYW5uZWwsIHVzZXJzKVxuICAgICAgICAgIC50aGVuKHJvbGUgPT4gUGFyc2UuUHJvbWlzZS5hcyhbIGNoYW5uZWwsIHJvbGUgXSkpXG4gICAgICB9KVxuICAgICAgLy8gYXNzaWduIHJvbGUgYW5kIHNldCBBQ0xcbiAgICAgIC50aGVuKGFyZ3MgPT4ge1xuICAgICAgICBjb25zdCBbIGNoYW5uZWwsIHJvbGUgXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGFjbCA9IG9wdGlvbnMucHVibGljID8gY3JlYXRlUHVibGljQUNMKCkgOiBjcmVhdGVQcml2YXRlQUNMKCk7XG5cbiAgICAgICAgYWNsLnNldFJvbGVXcml0ZUFjY2Vzcyhyb2xlLCB0cnVlKTtcbiAgICAgICAgYWNsLnNldFJvbGVSZWFkQWNjZXNzKHJvbGUsIHRydWUpO1xuICAgICAgICBjaGFubmVsLnNldEFDTChhY2wpO1xuXG4gICAgICAgIHJldHVybiBjaGFubmVsLnNhdmUobnVsbCwgdXNlTWFzdGVyS2V5KVxuICAgICAgfSlcbiAgfTtcblxuICAvLyByZXR1cm5zIFJvbGVcbiAgc3RhdGljIF9hdHRhY2hSb2xlIChjaGFubmVsOiBDaGFubmVsLCB1c2VyczogQXJyYXk8T2JqZWN0Pik6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgLy8gY3JlYXRlIHJvbGUgZm9yIHRoaXMgY2hhbm5lbCB0aGF0IGhhbmRsZXNcbiAgICAvLyBSb2xlIEFDTCBmb3IgZWFjaCB1c2VycyBpbiB0aGlzIGNoYW5uZWxcbiAgICBjb25zdCBuYW1lID0gYF8ke0ZpZWxkTmFtZS5NZXNzYWdlQ2hhbm5lbH1fJHtyYW5kb21TdHJpbmcoKX1gO1xuICAgIGNvbnN0IHJvbGUgPSBuZXcgUGFyc2UuUm9sZShuYW1lLCBjcmVhdGVQcml2YXRlQUNMKCkpO1xuICAgIHVzZXJzLmZvckVhY2godXNlciA9PiByb2xlLmdldFVzZXJzKCkuYWRkKHVzZXIpKTtcblxuICAgIHJldHVybiByb2xlXG4gICAgICAuc2F2ZShudWxsLCB1c2VNYXN0ZXJLZXkpXG4gICAgICAudGhlbihyb2xlID0+IHtcbiAgICAgICAgLy8gYWRkIG1lc3NhZ2UgY2hhbm5lbCByZWZlcmVuY2VcbiAgICAgICAgY29uc3QgcmVsYXRpb24gPSByb2xlLnJlbGF0aW9uKEZpZWxkTmFtZS5NZXNzYWdlQ2hhbm5lbCk7XG4gICAgICAgIHJlbGF0aW9uLmFkZChjaGFubmVsKTtcbiAgICAgICAgcmV0dXJuIHJvbGUuc2F2ZShudWxsLCB1c2VNYXN0ZXJLZXkpXG4gICAgICB9KVxuICB9O1xuXG59XG5cblBhcnNlLk9iamVjdC5yZWdpc3RlclN1YmNsYXNzKF9jbGFzc05hbWUsIENoYW5uZWwpO1xuIl19
