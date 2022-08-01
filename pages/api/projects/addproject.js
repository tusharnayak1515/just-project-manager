import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Task from "../../../models/Task";
import Joi from "joi";
import validate from "../../../middlewares/validate";

const schema = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(5).required()
});

const handler = validate({body: schema}, async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const userId = req.user.id;
      let user = await User.findById(userId);
      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      const {title, description} = req.body;

      const project = await Project.create({
        title,
        description,
        user: userId
      });

      user = await User.findByIdAndUpdate(userId, {$push: {projects: project}},{new: true})
        .select("-password");
      
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
});

export default fetchUser(handler);
