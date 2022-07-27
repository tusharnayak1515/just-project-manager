import connectToMongo from "../../../db";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from "joi";
import validate from "../../../middlewares/validate";
import { setCookies } from 'cookies-next';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const secret = process.env.JWT_SECRET;

const handler = validate({ body: schema }, async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const { email, password } = req.body;

      const user = await User.findOne({email: email});
      if(!user) {
        success = false;
        return res.json({success, error: "No account is associated to this email", status: 400});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if (!passwordCompare) {
        success = false;
        return res.json({success, error: "Incorrect Password", status: 400});
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);
      setCookies("user_token", authToken, { req, res, maxAge: 60 * 60 * 24 });
      success = true;
      return res.json({ success, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
});

export default handler;