export const handleProfileView = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: `${user.firstName}'s profile fetched Successfully !!!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
