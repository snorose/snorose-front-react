export const isEmailValid = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isNumber = (value) => {
  return /^[1-9]\d*$/.test(value);
};

export const validClassNumber = (value) => {
  if (!isNumber(value) && value !== '') {
    return false;
  }

  if (value.length > 3) {
    return false;
  }

  return true;
};
