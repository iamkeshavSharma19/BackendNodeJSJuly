import validator from "validator";

export const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstName, lastName, emailId or password is missing",
    );
  } else if (firstName.length < 3 || firstName.length > 20) {
    throw new Error("FirstName should lie between 3 to 20 characters");
  } else if (lastName.length < 3 || lastName.length > 20) {
    throw new Error("LastName should lie between 3 to 20 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid emailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

export const validateEditProfileData = (editData) => {
  const ALLOWED_EDIT_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
  ];

  const isEditAllowed = Object.keys(editData).every((key) =>
    ALLOWED_EDIT_FIELDS.includes(key),
  );

  return isEditAllowed;
};
