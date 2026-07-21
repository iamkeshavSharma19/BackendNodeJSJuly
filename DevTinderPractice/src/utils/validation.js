import validator from "validator";

export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error("Please enter all Your Details");
  }

  const { skills } = req.body;

  if (skills && skills.length > 10) {
    throw new Error("You are allowed to enter 10 skills only");
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Either firstname, lastname, email or password is missing");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstname should be between 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email Id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};
