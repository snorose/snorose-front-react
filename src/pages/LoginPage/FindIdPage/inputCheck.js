export function checkSpecialChar(input) {
  const format = /[ -/:-@[-`{-~]/;
  const emojisRegex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u200D(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
  if (input.length === 0) {
    return 'ready';
  }
  if (format.test(input) || emojisRegex.test(input)) {
    return 'wrong';
  } else {
    return 'right';
  }
}
export function checkSookmyungMail(mail) {
  const splitMailArr = mail.split('@');
  if (mail.length === 0) {
    return 'ready';
  }
  if (splitMailArr[1] === 'sookmyung.ac.kr') {
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
