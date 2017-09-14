export const randomString = (length = 5) => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length + 1; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
