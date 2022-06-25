import connectToMongo from "../../../db";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const handler = async (req, res)=> {
  connectToMongo();
  if (req.method === 'POST') {
    let success;
    try {
      const { name, email, password } = req.body;

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
      success = true;
      return res.json({ success, authToken, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
}

export default handler;