import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
import Joi from "joi";
import validate from "../../../middlewares/validate";
// import { setCookies } from "cookies-next";

const schema = Joi.object({
  title: Joi.string().min(4).required(),
  status: Joi.string().valid('created','in progress', 'completed').required()
});

const handler = validate({body: schema}, async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const taskId = req.query.task;
      const userId = req.user.id;
      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const {title, status} = req.body;

      let task = await Task.findById(taskId);
      if(!task) {
        success = false;
        return res.json({success, error: "Task doesnot exist", status: 404});
      }

      const projectId = task.project.toString();

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      const authorized = (project.user.toString() === userId) && (task.user.toString() === userId);

      if(!authorized) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      task = await Task.findByIdAndUpdate(taskId, {title: title, status: status},{new: true});
      
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
});

export default fetchUser(handler);
