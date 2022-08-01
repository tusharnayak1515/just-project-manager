import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'DELETE') {
    let success;
    try {
      const userId = req.user.id;
      const projectId = req.query.project;
      if(projectId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid projectId"});
      }

      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      if(project.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      user = await User.findByIdAndUpdate(userId, {$pull: {projects: projectId}},{new: true})
        .select("-password");

      project = await Project.findByIdAndDelete(projectId,{new: true});
      
      const projects = await Project.find({user: userId})
        .populate("tasks", "_id title status project")
        .sort("-createdAt");

      success = true;
      return res.json({ success, user, projects, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
