import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
import { setCookies } from "cookies-next";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'DELETE') {
    let success;
    try {
      const projectId = req.query.project;
      const userId = req.user.id;
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
        .populate("projects", "_id title description tasks status");

      project = await Project.findByIdAndDelete(projectId,{new: true});
      
      const projects = await Project.find({user: userId})
        .populate("tasks", "_id title status project");

      setCookies("jpm_projects", JSON.stringify(projects), {req,res});

      success = true;
      return res.json({ success, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
