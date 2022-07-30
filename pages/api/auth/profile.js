import connectToMongo from "../../../db";
import User from "../../../models/User";
import fetchUser from "../../../middlewares/fetchUser";
import Project from "../../../models/Project";
import { setCookie, getCookie, setCookies, getCookies } from 'cookies-next';

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'GET') {
    let success;
    try {
      const userId = req.user.id;
      const user = await User.findById(userId)
        .select("-password");

      if(!user) {
        success = false;
        return res.json({success, error: "User doesnot exist", status: 404});
      }

      success = true;
      // console.log(JSON.stringify(user));
      // console.log("kjfdhhj1");
      setCookies("jpm_profile", JSON.stringify(user), { req, res });
      // console.log("kjfdhhj2");
      // res.cookie("jpm_profile", JSON.stringify(user), {req, res});
      // console.log("api: ",JSON.parse(getCookie("jpm_profile",{req,res})));
      // console.log("api: ",getCookies({req,res}));
      return res.json({ success, user, status: 200 });

    } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
    }
  }
}

export default fetchUser(handler);
