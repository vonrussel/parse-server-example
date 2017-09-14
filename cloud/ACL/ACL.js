"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPrivateACL = exports.createPrivateACL = function createPrivateACL() {
  var acl = new Parse.ACL();

  acl.setPublicWriteAccess(false);
  acl.setPublicReadAccess(false);
  return acl;
};

var createPublicACL = exports.createPublicACL = function createPublicACL(_ref) {
  var _ref$read = _ref.read,
      read = _ref$read === undefined ? true : _ref$read,
      _ref$write = _ref.write,
      write = _ref$write === undefined ? true : _ref$write;

  var acl = new Parse.ACL();

  acl.setPublicWriteAccess(write);
  acl.setPublicReadAccess(read);
  return acl;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFDTC9BQ0wuanMiXSwibmFtZXMiOlsiY3JlYXRlUHJpdmF0ZUFDTCIsImFjbCIsIlBhcnNlIiwiQUNMIiwic2V0UHVibGljV3JpdGVBY2Nlc3MiLCJzZXRQdWJsaWNSZWFkQWNjZXNzIiwiY3JlYXRlUHVibGljQUNMIiwicmVhZCIsIndyaXRlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNPLElBQU1BLDhDQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07QUFDcEMsTUFBTUMsTUFBTSxJQUFJQyxNQUFNQyxHQUFWLEVBQVo7O0FBRUFGLE1BQUlHLG9CQUFKLENBQXlCLEtBQXpCO0FBQ0FILE1BQUlJLG1CQUFKLENBQXdCLEtBQXhCO0FBQ0EsU0FBT0osR0FBUDtBQUNELENBTk07O0FBUUEsSUFBTUssNENBQWtCLFNBQWxCQSxlQUFrQixPQUFtQztBQUFBLHVCQUFoQ0MsSUFBZ0M7QUFBQSxNQUFoQ0EsSUFBZ0MsNkJBQXpCLElBQXlCO0FBQUEsd0JBQW5CQyxLQUFtQjtBQUFBLE1BQW5CQSxLQUFtQiw4QkFBWCxJQUFXOztBQUNoRSxNQUFNUCxNQUFNLElBQUlDLE1BQU1DLEdBQVYsRUFBWjs7QUFFQUYsTUFBSUcsb0JBQUosQ0FBeUJJLEtBQXpCO0FBQ0FQLE1BQUlJLG1CQUFKLENBQXdCRSxJQUF4QjtBQUNBLFNBQU9OLEdBQVA7QUFDRCxDQU5NIiwiZmlsZSI6IkFDTC9BQ0wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCBjcmVhdGVQcml2YXRlQUNMID0gKCkgPT4ge1xuICBjb25zdCBhY2wgPSBuZXcgUGFyc2UuQUNMKCk7XG5cbiAgYWNsLnNldFB1YmxpY1dyaXRlQWNjZXNzKGZhbHNlKTtcbiAgYWNsLnNldFB1YmxpY1JlYWRBY2Nlc3MoZmFsc2UpO1xuICByZXR1cm4gYWNsO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUHVibGljQUNMID0gKHsgcmVhZCA9IHRydWUsIHdyaXRlID0gdHJ1ZSB9KSA9PiB7XG4gIGNvbnN0IGFjbCA9IG5ldyBQYXJzZS5BQ0woKTtcblxuICBhY2wuc2V0UHVibGljV3JpdGVBY2Nlc3Mod3JpdGUpO1xuICBhY2wuc2V0UHVibGljUmVhZEFjY2VzcyhyZWFkKTtcbiAgcmV0dXJuIGFjbDtcbn1cblxuIl19
