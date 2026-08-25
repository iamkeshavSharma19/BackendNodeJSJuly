import validator from "validator";

export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error(
      "It is mandatory to fill all the Input Fields for Signing Up",
    );
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstname is missing or lastname is missing or emailId is missing or password is missing",
    );
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("first name should lie between 4 to 20 characters");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("last name should lie between 4 to 20 characters length");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is Invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password");
  }
};
