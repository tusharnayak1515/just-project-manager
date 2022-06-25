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
      const projectId = req.query.project;
      const userId = req.user.id;
      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const {title} = req.body;

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      if(project.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      const task = await Task.create({
        title,
        project: projectId,
        user: userId
      });

      project = await Project.findByIdAndUpdate(projectId, {$push: {tasks: task}},{new: true})
        .populate("tasks", "_id title status project")
      
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
