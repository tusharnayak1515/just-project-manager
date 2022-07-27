import { setCookies, deleteCookie, removeCookies , getCookie } from 'cookies-next';

const handler = async (req, res)=> {
  if (req.method === 'GET') {
    let success;
    try {
      const token = getCookie("user_token",{req, res});
      const profile = getCookie("jpm_profile",{req, res});
      const projects = getCookie("jpm_projects",{req, res});
      const tasks = getCookie("jpm_tasks",{req, res});
      const error = getCookie("jpm_error",{req, res});
      removeCookies(token,{ path: '/', domain: 'http://localhost:3000' });
      removeCookies(profile,{ path: '/', domain: 'http://localhost:3000' });
      removeCookies(projects,{ path: '/', domain: 'http://localhost:3000' });
      removeCookies(tasks,{ path: '/', domain: 'http://localhost:3000' });
      removeCookies(error,{ path: '/', domain: 'http://localhost:3000' });
      success = true;
      return res.json({ success, status: 200 });

    } catch (error) {
      success = false;
      return res.json({success, error: error.message, status: 500});
    }
  }
};

export default handler;