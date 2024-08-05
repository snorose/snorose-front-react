export function checkSpecialChar(input) {
  const format = /^[A-Za-z가-힣0-9 ]+$/;
  if (input.length === 0) {
    return 'ready';
  }
  if (format.test(input)) {
    return 'right';
  } else {
    return 'wrong';
  }
}

export function checkSookmyungMail(mail) {
  const splitMailArr = mail.split('@');
  if (mail.length === 0) {
    return 'ready';
  }
  if (splitMailArr[1] === 'sookmyung.ac.kr' || splitMailArr[1] === 'sm.ac.kr') {
    return 'right';
  } else {
    return 'wrong';
  }
}

export function checkStudentNum(number) {
  const len = number.length;
  if (number.length === 0) {
    return 'ready';
  }
  if (len === 7) {
    return 'right';
  } else {
    return 'wrong';
  }
}
