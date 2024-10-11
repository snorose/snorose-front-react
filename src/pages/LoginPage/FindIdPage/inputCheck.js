export function checkIfEntered(input) {
  input = input?.trim();
  if (!input?.length) {
    return 'ready';
  } else {
    return 'right';
  }
}

export function checkName(input) {
  input = input?.trim();
  const format = /^[A-Za-z가-힣ㄱ-ㅎ]+$/;
  if (!input?.length) {
    return 'ready';
  }
  if (format.test(input) && input?.length > 1 && input?.length < 31) {
    return 'right';
  } else {
    return 'wrong';
  }
}

export function checkSpecialChar(input) {
  input = input?.trim();
  const format = /^[A-Za-z가-힣ㄱ-ㅎ0-9]+$/;
  if (!input?.length) {
    return 'ready';
  }
  if (format.test(input) && input?.length > 1 && input?.length < 21) {
    return 'right';
  } else {
    return 'wrong';
  }
}
export function checkMail(mail) {
  mail = mail?.trim();
  let isDomain = true;
  if (!mail?.length) {
    return 'ready';
  } else {
    const [email, domain] = mail?.split('@');
    if (!email || !domain) {
      return 'wrong';
    } else {
      const domainArr = domain.split('.');
      domainArr.map((element) => {
        if (!element?.length) {
          isDomain = false;
        }
      });
      if (domainArr.length === 1 || !isDomain) {
        return 'wrong';
      } else {
        return 'right';
      }
    }
  }
}

export function checkSookmyungMail(mail) {
  mail = mail?.trim();
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
  number = number?.trim();
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
  id = id?.trim();
  const format = /^[A-Za-z0-9]+$/;
  if (id?.length === 0) {
    return 'ready';
  } else if (id.length >= 5 && id.length <= 30 && format.test(id))
    return 'right';
  else return 'wrong';
}

export function checkPW(pw) {
  pw = pw?.trim();
  if (pw?.length === 0) return 'ready';
  let isAlphabet,
    isNumber,
    isSpecialChar = false;
  if (pw?.length < 8 || pw?.length > 17) {
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
  input1 = input1?.trim();
  input2 = input2?.trim();
  if (!input2) return 'ready';
  else if (input1 === input2) return 'right';
  else return 'wrong';
}

export function checkBirthday(input) {
  input = input?.trim();

  if (!input) return 'ready';

  const [year, month, date] = input.split('-');
  const todayDate = new Date();
  const birthDate = new Date(year, month - 1, date);

  for (let i = 0; i < 3; i++) {
    if (!/^\d+$/.test(year) || !/^\d+$/.test(month) || !/^\d+$/.test(date)) {
      return 'wrong';
    }
  }
  if (
    todayDate < birthDate ||
    year.length !== 4 ||
    month.length !== 2 ||
    date.length !== 2 ||
    parseInt(month) < 1 ||
    parseInt(month) > 12
  ) {
    return 'wrong';
  }
  switch (parseInt(month)) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (parseInt(date) < 1 || parseInt(date) > 31) return 'wrong';
      break;
    case 2:
    case 4:
    case 6:
    case 9:
    case 11:
      if (parseInt(date) < 1 || parseInt(date) > 30) return 'wrong';
      break;
    default:
      return 'right';
  }
  return 'right';
}
