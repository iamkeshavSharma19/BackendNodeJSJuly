import { validateEditProfileData } from "../utils/validations.js";

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

export const handleProfileEdit = async (req, res) => {
  try {
    const editData = req.body;
    const isEditAllowed = validateEditProfileData(editData);
    if (!isEditAllowed) {
      return res.status(400).json({
        success: false,
        message: "Invalid Edit Fields. Edit Not Allowed",
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }

  
};
