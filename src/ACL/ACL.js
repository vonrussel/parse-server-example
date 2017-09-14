
export const createPrivateACL = () => {
  const acl = new Parse.ACL();

  acl.setPublicWriteAccess(false);
  acl.setPublicReadAccess(false);
  return acl;
}

export const createPublicACL = ({ read = true, write = true }) => {
  const acl = new Parse.ACL();

  acl.setPublicWriteAccess(write);
  acl.setPublicReadAccess(read);
  return acl;
}

