import validator from "validator";

export const validateSignUpData = (req) => {
  console.log(req.body)
  if (!req.body) {
    throw new Error("It is mandatory to fill all the input Fields");
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "Either firstName is missing, or lastName is missing or emailId is missing or password is missing",
    );
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("FirstName should lie between 4 to 20 characters only");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("LastName should lie between 4 to 20 characters only");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Provide a valid EmailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Provide a Strong Password");
  }
};
