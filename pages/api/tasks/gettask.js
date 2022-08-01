import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const userId = req.user.id;
      const taskId = req.query.task;
      if(taskId.length !== 24) {
        success = false;
        return res.status(400).json({success, error: "Invalid taskId"});
      }

      const user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const task = await Task.findById(taskId);
      if(!task) {
        success = false;
        return res.json({success, error: "Task doesnot exist", status: 404});
      }

      const project = await Project.findById(task.project.toString());
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      success = true;
      return res.json({ success, task, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
