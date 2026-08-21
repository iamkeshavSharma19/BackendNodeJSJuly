import { Wrestler } from "../models/wrestler.js";

export const handleAddWrestler = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error(
        "Unable To SignUp The Wrestler.Please fill all the input fields",
      );
    }
    const userInfo = Object.keys(req.body);
    if (userInfo.length === 0) {
      throw new Error(
        "Unable To SignUp The Wrestler.Please fill all the input fields",
      );
    }

    const wrestler = new Wrestler(req.body);
    await wrestler.save();
    res.status(201).json({
      message: "Wrestler SignedUp Successfully",
      wrestler,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleFindWrestler = async (req, res) => {
  try {
    const { id: wrestlerId } = req.params;
    //?find method returns the array of all the matched documents,If no documment is found then it returns the empty array.
    //?In find() method if we pass nothing like find({}),then find method returns us all the documents present inside the collection.
    const wrestler = await Wrestler.find({ _id: wrestlerId });
    if (wrestler.length === 0) {
      return res.status(404).json({
        message: "No Wrestler Found",
        wrestler,
      });
    }
    res.status(200).json({
      message: "Wrestler Found Successfully",
      wrestler,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleFindOneWrestler = async (req, res) => {
  try {
    const { id: wrestlerId } = req.params;
    //?findOne method returns us a single matched document if found, otherwise it returns null.
    //?If we pass nothing in findOne({}),then it returns us the first document present in the collection.
    const wrestler = await Wrestler.findOne({ _id: wrestlerId });
    if (!wrestler) {
      return res.status(404).json({
        message: "Unable To Find The Wrestler",
        wrestler,
      });
    }

    res.status(200).json({
      message: "Wrestler Found Successfully",
      wrestler,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleGetAllWrestlers = async (req, res) => {
  try {
    const allWrestlers = await Wrestler.find({});
    if (allWrestlers.length === 0) {
      return res.status(200).json({
        message: "Unable To Fetch all the wrestlers from the database",
        allWrestlers,
      });
    }
    res.status(200).json({
      message: "All The Wrestlers are fetched Successfully",
      allWrestlers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleDeleteWrestlers = async (req, res) => {
  try {
    const { id: deleteId } = req.params;
    const deletedWrestler = await Wrestler.findByIdAndDelete({ _id: deleteId });
    if (!deletedWrestler) {
      return res.status(400).json({
        message: "Unable To Delete The Wrestler",
        deletedWrestler,
      });
    }
    res.status(200).json({
      message: "Wrestler Deleted Successfully",
      deletedWrestler,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleEditWrestler = async (req, res) => {
  try {
    const { id: updatedId } = req.params;
    const updatedData = req.body;
    const ALLOWED_UPDATES = ["gender", "skills"];
    const isAllowedUpdate = Object.keys(updatedData).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowedUpdate) {
      throw new Error("Unable To Edit");
    }
    const updatedUser = await Wrestler.findByIdAndUpdate(
      { _id: updatedId },
      updatedData,
      {
        returnDocument: after,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "Unable To Update The User",
        updatedUser,
      });
    }

    res.status(201).json({
      message: "Wrestler Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
