const mail_regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const digit_regex = /^[0-9]*$/;
export const requiredValidator = (val: any) => (val ? true : false);
export const numericValidator = (val: string | null) =>
  val ? val.match(digit_regex) : true;
export const mailValidator = (val: string | null) =>
  val ? String(val).toLowerCase().match(mail_regex) : true;
export const passwordValidator = (val: string) => val && val.length >= 4;
export const passwordEqual = (val1: string, val2: string) =>
  val1 === val2 ? true : false;
