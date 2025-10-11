function signinValidation(values) {
  const errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(values.name.trim())) {
    errors.name = "Name should contain only letters and spaces";
  } else {
    errors.name = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Email is not valid";
  } else {
    errors.email = "";
  }

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "Password must be minimum 8 characters, including at least one letter and one number";
  } else {
    errors.password = "";
  }

  return errors;
}

export default signinValidation;
