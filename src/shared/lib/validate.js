export const isEmailValid = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isNumber = (value) => {
  return /^\d+$/.test(value);
};

export function isUrlValid(url) {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(parsed.hostname);
  } catch {
    return false;
  }
}
