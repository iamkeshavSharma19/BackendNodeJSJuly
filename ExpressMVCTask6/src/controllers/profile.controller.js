import { validateEditProfileData } from "../utils/validations.js";

export const handleViewProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Invalid Authentication.Please Login",
      });
    }
    const { firstName, lastName, emailId } = user;
    return res.status(200).json({
      message: "User's Profile fetched Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        gender: user.gender,
        skills: user.skills,
        about: user.about,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const handleEditProfile = async (req, res) => {
  try {
    const isEditAllowed = validateEditProfileData(req);
    if (!isEditAllowed) {
      return res.status(400).json({
        message: "Invalid Edit Request",
      });
    }
    const user = req.user;
    const data = req.body;
    Object.keys(data).forEach((key) => (user[key] = data[key]));
    if (user.skills.length > 10) {
      throw new Error("Skills cannot be greater than 10");
    }
    await user.save();
    res.status(201).json({
      message: "User Profile Updated Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        gender: user.gender,
        skills: user.skills,
        about: user.about,
        age: user.age,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};
