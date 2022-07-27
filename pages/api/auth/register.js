import connectToMongo from "../../../db";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from "joi";
const { joiPassword } = require('joi-password');
import validate from "../../../middlewares/validate";
import { setCookies } from 'cookies-next';

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: joiPassword.string().min(8).minOfUppercase(1).minOfSpecialCharacters(1).minOfLowercase(1).minOfNumeric(1).required(),
});

const secret = process.env.JWT_SECRET;

const handler = validate({ body: schema }, async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const { name, email, password } = req.body;

      let confirmUser = await User.findOne({email: req.body.email});
      if(confirmUser) {
        success = false;
        return res.json({success, error: "This email is already associated to another account!", status: 400});
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        email: email,
        password: securePassword,
        projects: []
      });

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