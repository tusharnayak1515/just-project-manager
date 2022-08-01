import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import Joi from "joi";
import validate from "../../../middlewares/validate";

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required()
});

const handler = validate({ body: schema }, async (req, res)=> {
  connectToMongo();
  if (req.method === 'PUT') {
    let success;
    try {
      const {name,email} = req.body;
      const userId = req.user.id;
      let user = await User.findById(userId);

      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      let user1 = await User.findOne({email: email});

      if(user1) {
        if(user1._id.toString() !== userId) {
          success = false;
          return res.json({success, error: "Email is already taken!", status: 400});
        }
      }

      user = await User.findByIdAndUpdate(userId, {name: name, email: email}, {new: true})
        .select("-password");

      setCookies("jpm_profile", JSON.stringify(user), {req, res});
      success = true;
      return res.json({ success, user, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
});

export default fetchUser(handler);
