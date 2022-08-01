import { removeCookies , getCookie } from 'cookies-next';

const handler = async (req, res)=> {
  const link = process.env.NODE_ENV === "production" ? "https://just-project-manager.vercel.app" : "http://localhost:3000"
  if (req.method === 'GET') {
    let success;
    try {
      const token = getCookie("user_token",{req, res});
      const profile = getCookie("jpm_profile",{req, res});
      removeCookies(token,{ path: '/', domain: link });
      removeCookies(profile,{ path: '/', domain: link });
      success = true;
      return res.json({ success, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
};

export default handler;