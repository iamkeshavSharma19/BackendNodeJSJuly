export const handleUserSignUp = async (req, res) => {
  try {
    validateSignUpData(req);
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
