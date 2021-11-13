export const validations = {
  eightChar: new RegExp("^(?=.{8,})"),
  upper: new RegExp("^(?=.*[A-Z])"),
  numerical: new RegExp("^(?=.*[0-9])"),
  specialChar: new RegExp("^(?=.*[!@#$%^&*])"),
};

export const verifyEightChar = (password) => {
  return (validations.eightChar.test(password))
}

export const verifyUpper = (password) => {
  return validations.upper.test(password)
}

export const verifyNum = (password) => {
  return validations.numerical.test(password)
}

export const verifySpecialChar = (password) => {
  return validations.specialChar.test(password)
}

//This is for the button in reset Password
export const activateButton = (password, confirmPassword) => {
  if (
    validations.eightChar.test(password) &&
    validations.upper.test(password) &&
    validations.numerical.test(password) &&
    validations.specialChar.test(password) &&
    validations.eightChar.test(confirmPassword) &&
    validations.upper.test(confirmPassword) &&
    validations.numerical.test(confirmPassword) &&
    validations.specialChar.test(confirmPassword) &&
    (confirmPassword === password)
  ) {
    return false;
  }
  return true;
};


export const verifyPassword = (password) => {
  if (
    validations.eightChar.test(password) &&
    validations.upper.test(password) &&
    validations.numerical.test(password) &&
    validations.specialChar.test(password)
  ) {
    return true;
  }
  return false;
};




export const verifyEmailFormat = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const verifyDomainFormat = (str) => {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
    str
  );
};
