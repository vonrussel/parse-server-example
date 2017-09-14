'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomString = exports.randomString = function randomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length + 1; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }return text;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpYi9VdGlscy5qcyJdLCJuYW1lcyI6WyJyYW5kb21TdHJpbmciLCJsZW5ndGgiLCJ0ZXh0IiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLHNDQUFlLFNBQWZBLFlBQWUsR0FBZ0I7QUFBQSxNQUFmQyxNQUFlLHVFQUFOLENBQU07O0FBQzFDLE1BQUlDLE9BQU8sRUFBWDtBQUNBLE1BQUlDLFdBQVcsZ0VBQWY7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlILFNBQVMsQ0FBN0IsRUFBZ0NHLEdBQWhDO0FBQ0VGLFlBQVFDLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQkwsU0FBU0YsTUFBcEMsQ0FBaEIsQ0FBUjtBQURGLEdBR0EsT0FBT0MsSUFBUDtBQUNELENBUk0iLCJmaWxlIjoiTGliL1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHJhbmRvbVN0cmluZyA9IChsZW5ndGggPSA1KSA9PiB7XG4gIHZhciB0ZXh0ID0gJyc7XG4gIHZhciBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGggKyAxOyBpKyspXG4gICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG5cbiAgcmV0dXJuIHRleHQ7XG59O1xuIl19
