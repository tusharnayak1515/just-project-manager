import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const projectId = req.query.project;
      const taskId = req.query.task;
      const userId = req.user.id;
      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const {title, status} = req.body;

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      let task = await Task.findById(taskId);
      if(!task) {
        success = false;
        return res.json({success, error: "Task doesnot exist", status: 404});
      }

      if(project.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      if(task.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      task = await Task.findByIdAndUpdate(taskId, {title: title, status: status},{new: true});
      
      const tasks = await Task.find({project: projectId})
        .populate("project", "_id title description tasks status");

      success = true;
      return res.json({ success, project, tasks, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default fetchUser(handler);
