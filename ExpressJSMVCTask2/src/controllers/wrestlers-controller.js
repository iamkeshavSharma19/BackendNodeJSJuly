import { Wrestler } from "../models/wrestler-model.js";

export const handleCreateWrestler = async (req, res) => {
  try {
    const { skills } = req.body;

    if (skills) {
      if (skills.length > 10) {
        return res.status(400).json({
          message: "Skills cannot exceed the 10",
          skills,
        });
      }
    }
    const wrestler = new Wrestler(req.body);
    await wrestler.save();
    res.status(201).json({
      message: "Wrestler created Successfully",
      wrestler,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const handleGetAllWrestlers = async (req, res) => {
  try {
    const allWrestlers = await Wrestler.find({});
    if (allWrestlers.length === 0) {
      res.status(404).json({
        message: "Not able to fetch all the wrestlers",
        allWrestlers,
      });
    } else {
      res.status(200).json({
        message: "All the wrestlers are fetched successfully",
        allWrestlers,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const handleGetSingleWrestler = async (req, res) => {
  try {
    const wrestlerId = req.params.id;
    const wrestler = await Wrestler.findById({ _id: wrestlerId });
    if (!wrestler) {
      res.status(404).json({
        message: "Wrestler Not Found",
        wrestler,
      });
    } else {
      res.status(200).json({
        message: "Wrestler Found Successfully",
        wrestler,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error,
    });
  }
};
export const handleDeleteWrestler = async (req, res) => {
  try {
    const wrestlerId = req.params.id;
    console.log(wrestlerId);
    const wrestler = await Wrestler.findByIdAndDelete({ _id: wrestlerId });
    console.log(wrestler);
    if (!wrestler) {
      res.status(404).json({
        message: "Unable to delete the User",
        wrestler,
      });
    } else {
      res.status(200).json({
        message: "Wrestler deleted Successfully",
        wrestler,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const handleEditWrestler = async () => {};
