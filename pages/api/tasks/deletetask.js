import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
// import { setCookies } from "cookies-next";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'DELETE') {
    let success;
    try {
      const userId = req.user.id;
      const taskId = req.query.taskId;
      if(taskId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid taskId"});
      }

      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      let task = await Task.findById(taskId);
      if(!task) {
        success = false;
        return res.json({success, error: "Task doesnot exist", status: 404});
      }

      const projectId = task.project.toString();
      if(projectId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid projectId"});
      }

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      if(task.project.toString() !== projectId) {
        success = false;
        return res.json({success, error: "This task and project are not associated with each other!", status: 401});
      }

      const authorized = (project.user.toString() === userId) && (task.user.toString() === userId);

      if(!authorized) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      project = await Project.findByIdAndUpdate(projectId, {$pull: {tasks: taskId}}, {new: true});
      task = await Task.findByIdAndDelete(taskId,{new: true});
      
      const tasks = await Task.find({project: projectId});
        // .populate("project", "_id title description tasks status");
      
      // setCookies("jpm_tasks", JSON.stringify(tasks), {req,res}); 

      success = true;
      return res.json({ success, project, tasks, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
