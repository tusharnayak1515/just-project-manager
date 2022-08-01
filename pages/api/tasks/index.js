import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
// import { setCookies } from "cookies-next";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const projectId = req.query.project;
      if(projectId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid projectId"});
      }
      if(projectId.length != 24) {
        success = false;
        return res.json({success, error: "Invalid projectId", status: 400});
      }
      const userId = req.user.id;
      const user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }
      
      const tasks = await Task.find({project: projectId});
        // .populate("project", "_id title description status tasks");

      // setCookies("jpm_tasks", JSON.stringify(tasks), {req, res});

      success = true;
      return res.json({ success, tasks, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
