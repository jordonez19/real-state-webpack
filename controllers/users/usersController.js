const UsersModel = require("../../models/Users");

const getAllusers = async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.json(users);
  } catch (error) {
    console.log("get", error);
  }
};


module.exports = {
  getAllusers,
};
