import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const userId = req.user.id;
      const user = await User.findById(userId)
        .populate("projects", "_id title description tasks status");

      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      success = true;
      return res.json({ success, user, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
