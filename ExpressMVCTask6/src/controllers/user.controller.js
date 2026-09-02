export const handleViewConnectionRequests = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
