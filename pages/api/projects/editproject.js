import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
import Joi from "joi";
import validate from "../../../middlewares/validate";

const schema = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(5).required(),
  status: Joi.string().valid('created','in progress','completed').required()
});

const handler = validate({body: schema},async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
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

      const {title, description, status} = req.body;

      let project = await Project.findById(projectId);
      if(!project) {
        success = false;
        return res.json({success, error: "Project doesnot exist", status: 404});
      }

      if(project.user.toString() !== userId) {
        success = false;
        return res.json({success, error: "Not Allowed!", status: 405});
      }

      project = await Project.findByIdAndUpdate(projectId, {title: title, description: description, status: status},{new: true});
      
      const projects = await Project.find({user: userId})
        .populate("tasks", "_id title status project")
        .sort("-createdAt");

      success = true;
      return res.json({ success, projects, project, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
});

export default fetchUser(handler);
