export const isValidEmail = email => {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
export const isValidName = name => {
  let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  return reg.test(name);
};
export const isValidMobile = mobile => {
  let reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return reg.test(mobile);
};
export const isPasswordLen = pass => {
  let reg = /^(?=.*[a-zA-Z0-9]).{6,}$/;
  return reg.test(pass);
};
export const isValidPassword = password => {
  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/;
  return reg.test(password);
};
export const isValidPassCPass = (pass, confirmPassword) => {
  return pass === confirmPassword;
};
