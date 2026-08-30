import validator from "validator";

export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error("Please enter all your details");
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstname, lastname, emailId or password is missing",
    );
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("FirstName should lie between 4-20 characters only");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("LastName should lie between 4-20 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password");
  }
};

export const validateEditProfileData = (req) => {
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
