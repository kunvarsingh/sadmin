export const validate = (values) => {
	debugger
  const errors = {};
  if (!values.VocherName) {
    errors.VocherName = 'Please input Voucher Name';
  }

  return errors;
};