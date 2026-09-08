export const regexPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  phoneNumber: /^[1-9][0-9]{9}$/,
  gstIn: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  numberInput: /^[1-9]\d*$/,
  latitude: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
  longitude: /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/,
  secondsInput: /^(?:[1-9]\d+|10)$/
};
