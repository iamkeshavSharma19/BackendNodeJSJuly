import validator from "validator";

export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error("Please enter all your details");
  }

  const { skills } = req.body;
  console.log(skills);
  console.log(skills.length);
  if (skills && skills.length > 10) {
    throw new Error("Skills cannot be more than 10");
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstName, lastname, emailid or password is missing",
    );
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstname should be 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};
