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
      const projectId = req.query.project;
      const taskId = req.query.taskId;
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

      let task = await Task.findById(taskId);
      if(!task) {
        success = false;
        return res.json({success, error: "Task doesnot exist", status: 404});
      }

      if(task.project.toString() !== project._id.toString()) {
        success = false;
        return res.json({success, error: "This task and project are not associated with each other!", status: 401});
      }

      if(project.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      if(task.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      project = await Project.findByIdAndUpdate(projectId, {$pull: {tasks: taskId}}, {new: true});
      task = await Task.findByIdAndDelete(taskId,{new: true});
      
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
