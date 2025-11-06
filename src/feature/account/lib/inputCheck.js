import { isNumber } from '@/shared/lib';

export function validateUserName(value = '') {
  const format = /^[A-Za-z가-힣ㄱ-ㅎ]+$/;

  if (value.length === 0) {
    return 'default';
  }

  if (format.test(value) && value.length >= 2 && value.length <= 30) {
    return 'valid';
  }

  return 'error';
}

export function validateSookmyungEmail(value = '') {
  const domain = value.split('@')[1];

  if (value.length === 0) {
    return 'default';
  }

  if (domain === 'sookmyung.ac.kr' || domain === 'sm.ac.kr') {
    return 'valid';
  }

  return 'error';
}

export function validateId(value = '') {
  const format = /^[A-Za-z0-9]+$/;

  if (value.length === 0) {
    return 'default';
  }

  if (format.test(value) && value.length >= 5 && value.length <= 30) {
    return 'valid';
  }

  return 'error';
}

export function validatePassword(value = '') {
  const format = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#%^&*])[A-Za-z\d!@#%^&*]+$/;

  if (value.length === 0) {
    return 'default';
  }

  if (format.test(value) && value.length >= 8 && value.length <= 16) {
    return 'valid';
  }

  return 'error';
}

// --------------------------------------------
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
