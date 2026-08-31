export const validateSignUpData = (req) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Please enter all your details for signing up the data",
    });
  }

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    return res.status(400).json({
      message: "Either firstName, lastName, emailId or password is missing",
    });
  }

  if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("firstName should lie between 4 to 20 characters only");
  }
};
