import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const userId = req.user.id;
      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const {title, description} = req.body;

      const project = await Project.create({
        title,
        description,
        user: userId
      });

      user = await User.findByIdAndUpdate(userId, {$push: {projects: project}},{new: true})
        .populate("projects", "_id title description tasks status");
      
      const projects = await Project.find({user: userId})
        .populate("tasks", "_id title status project");

      success = true;
      return res.json({ success, projects, user, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
