import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const {name,email} = req.body;
      const userId = req.user.id;
      let user = await User.findById(userId);

      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      user = await User.findByIdAndUpdate(userId, {name: name, email: email}, {new: true})
        .populate("projects", "_id title description tasks status");

      success = true;
      return res.json({ success, user, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
