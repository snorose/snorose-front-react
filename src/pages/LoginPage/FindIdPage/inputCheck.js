export function checkSpecialChar(input) {
  const format = /^[A-Za-z가-힣ㄱ-ㅎ0-9 ]+$/;
  if (!input?.length) {
    return 'ready';
  }
  if (format.test(input)) {
    return 'right';
  } else {
    return 'wrong';
  }
}

export function checkSookmyungMail(mail) {
  const splitMailArr = mail?.split('@');
  if (!mail?.length) {
    return 'ready';
  }
  if (splitMailArr[1] === 'sookmyung.ac.kr' || splitMailArr[1] === 'sm.ac.kr') {
    return 'right';
  } else {
    return 'wrong';
  }
}

export function checkStudentNum(number) {
  if (number) {
    if (number?.length === 7 && !isNaN(number)) {
      return 'right';
    } else {
      return 'wrong';
    }
  }
  return 'ready';
}

export function checkID(id) {
  const format = /^[A-Za-z가-힣ㄱ-ㅎ0-9 ]+$/;
  if (id?.length === 0) {
    return 'ready';
  } else if (id.length >= 5 && id.length <= 30 && format.test(id))
    return 'right';
  else return 'wrong';
}

export function checkPW(pw) {
  if (pw?.length === 0) return 'ready';
  let isAlphabet,
    isNumber,
    isSpecialChar = false;
  if (pw?.length < 8) {
    return 'wrong';
  }
  pw.split('').map((char) => {
    if (/^[A-Za-z]+$/.test(char)) {
      isAlphabet = true;
    } else if (/^[0-9]+$/.test(char)) {
      isNumber = true;
    } else if (/^[$&+,:;=?@#|'<>.^*()%!-]+$/.test(char)) {
      isSpecialChar = true;
    }
  });
  if (isAlphabet && isNumber && isSpecialChar) {
    return 'right';
  }
  return 'wrong';
}

export function checkIfSame(input1, input2) {
  if (!input2) return 'ready';
  else if (input1 === input2) return 'right';
  else return 'wrong';
}

export function checkBirthday(input) {
  if (!input) return 'ready';
  const [year, month, date] = input.split('-');
  for (let i = 0; i < 3; i++) {
    if (!/^\d+$/.test(year) || !/^\d+$/.test(month) || !/^\d+$/.test(date)) {
      return 'wrong';
    }
  }
  if (year.length !== 4 || month.length !== 2 || date.length !== 2) {
    return 'wrong';
  }
  return 'right';
}
