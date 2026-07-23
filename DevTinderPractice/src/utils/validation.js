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

export const validateEditProfileData = (req) => {
  //?In this req, I donot want the user to edit everything.In my userSchema there are so many things, first of all let us check the allowedEditFields
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};
