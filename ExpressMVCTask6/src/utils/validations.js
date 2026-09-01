import validator from "validator";

export const validateSignUpData = (req) => {
  console.log(req.body);
  if (!req.body) {
    throw new Error("Please enter all your details for signing up");
  }

  const { firstName, lastName, emailId, password } = req.body;

  console.log(password);

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstName, lastName, emailId or password is missing",
    );
  }

  if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("firstName should lie between 4 to 20 characters only");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("lastName should lie between 4 to 20 characters only");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid EmailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

export const validateEditProfileData = (req) => {
  const ALLOWED_EDIT_FIELDS = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "age",
    "skills",
    "about",
  ];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_EDIT_FIELDS.includes(key),
  );

  console.log(isEditAllowed);

  return isEditAllowed;
};
