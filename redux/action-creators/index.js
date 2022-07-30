import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
// import { getCookie} from 'redux-cookie';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";

    dispatch({
      type: "user-loading",
    });

    try {
      const res = await axios.post(`${url}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        dispatch({
          type: "register",
          payload: {
            user: getCookie("user_token"),
          },
        });
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "register",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "register",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";

    dispatch({
      type: "user-loading",
    });

    try {
      const res = await axios.post(`${url}/api/auth/login`, { email, password });
      // console.log("123",getCookie("user_token"));
      if (res.data.success) {
        dispatch({
          type: "login",
          payload: {
            user: getCookie("user_token"),
          },
        });
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "login",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "login",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const something = () => async (dispatch) => {
  dispatch({
    type: "something",
  });
};

export const profile = (token) => async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
  try {
    // console.log("yeah");
    // console.log(token);
    const res = await axios.get(`${url}/api/auth/profile`, {
      headers: { user_token: token },
    });
    // console.log(res.data);
    // setCookies("jpm_profile",res.data.mycookie);
    // console.log(getCookie("jpm_profile"));
    if (res.data.success) {
      dispatch({
        type: "profile",
        payload: {
          profile: res.data.user,
        },
      });
    }

    if (res.data.error) {
      dispatch({
        type: "profile",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "profile",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

// export const setProfile = (profile)=> async (dispatch)=> {
//     dispatch({
//         type: 'set-profile',
//         payload: {
//             profile: profile
//         }
//     });
// }

export const editProfile =
  ({ name, email }) =>
  async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
    dispatch({
      type: "user-loading",
    });

    const token = localStorage.getItem("user_token");
    try {
      const res = await axios.put(
        `${url}/api/auth/editprofile`,
        { name, email },
        { headers: { user_token: token } }
      );

      if (res.data.success) {
        dispatch({
          type: "edit-profile",
          payload: {
            profile: res.data.user,
          },
        });
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "edit-profile",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "edit-profile",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const logout = () => async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
  try {
    const res = await axios.get(`${url}/api/auth/logout`);
    if (res.data.success) {
      removeCookies("user_token");
      removeCookies("jpm_profile");
      if (typeof window !== "undefined") {
        localStorage.removeItem("jpm_tasks");
        localStorage.removeItem("jpm_projects");
      }
      dispatch({
        type: "logout",
        payload: {
          user: null,
          profile: null,
          isLoading: false,
          projects: null,
          project: null,
          tasks: null,
          task: null,
        },
      });
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (res.data.error) {
      dispatch({
        type: "logout",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "logout",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getAllProjects = (token) => async (dispatch) => {
  const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
  try {
    const res = await axios.get(`${url}/api/projects/`, {
      headers: { user_token: token },
    });
    // console.log(res.data);
    if (res.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("jpm_projects", JSON.stringify(res.data.projects));
      }
      dispatch({
        type: "get-projects",
        payload: {
          projects: res.data.projects,
        },
      });
    }

    if (res.data.error) {
      dispatch({
        type: "get-projects",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "get-projects",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getProject = (id, token) => async (dispatch) => {
    const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";
  try {
    const res = await axios.get(
      `${url}/api/projects/getproject?project=${id}`,
      { headers: { user_token: token } }
    );

    if (res.data.success) {
      dispatch({
        type: "get-project",
        payload: {
          project: res.data.project,
        },
      });
    }

    if (res.data.error) {
      dispatch({
        type: "get-project",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "get-project",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const addProject =
  ({ title, description }) =>
  async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
    dispatch({
      type: "project-loading",
    });

    const token = localStorage.getItem("user_token");
    try {
      const res = await axios.post(
        `${url}/api/projects/addproject`,
        { title, description },
        { headers: { user_token: token } }
      );

      if (res.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "jpm_projects",
            JSON.stringify(res.data.projects)
          );
        }
        dispatch({
          type: "add-project",
          payload: {
            projects: res.data.projects,
          },
        });
        toast.success("Project added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "add-project",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "get-project",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const editProject =
  ({ id, title, description, status }) =>
  async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
    dispatch({
      type: "project-loading",
    });

    try {
      const res = await axios.put(`${url}/api/projects/editproject?project=${id}`, {
        title,
        description,
        status,
      });

      if (res.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "jpm_projects",
            JSON.stringify(res.data.projects)
          );
        }
        dispatch({
          type: "edit-project",
          payload: {
            projects: res.data.projects,
            project: res.data.project,
          },
        });
        toast.success("Project updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "edit-project",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "edit-project",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const deleteProject = (id) => async (dispatch) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://just-project-manager.vercel.app"
        : "http://localhost:3000";
  try {
    const res = await axios.delete(`${url}/api/projects/deleteproject?project=${id}`);

    if (res.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("jpm_projects", JSON.stringify(res.data.projects));
      }
      dispatch({
        type: "delete-project",
        payload: {
          projects: res.data.projects,
        },
      });
      toast.success("Project deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (res.data.error) {
      dispatch({
        type: "delete-project",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "delete-project",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getAllTasks = (id, token) => async (dispatch) => {
    const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";
  try {
    const res = await axios.get(
      `${url}/api/tasks?project=${id}`,
      { headers: { user_token: token } }
    );

    if (res.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("jpm_tasks", JSON.stringify(res.data.tasks));
      }
      dispatch({
        type: "get-tasks",
        payload: {
          tasks: res.data.tasks,
        },
      });
    }

    if (res.data.error) {
      dispatch({
        type: "get-tasks",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "get-tasks",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getTask = (id) => async (dispatch) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";

  dispatch({
    type: "task-loading",
  });

  
  try {
    const res = await axios.get(`${url}/api/tasks/gettask?task=${id}`);

    if (res.data.success) {
      dispatch({
        type: "get-task",
        payload: {
          task: res.data.task,
        },
      });
    }

    if (res.data.error) {
      dispatch({
        type: "get-task",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "get-task",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const resetTask = () => async (dispatch) => {
  dispatch({
    type: "reset-task",
  });
};

export const addTask = (id, title) => async (dispatch) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";
  dispatch({
    type: "task-loading",
  });

  try {
    const res = await axios.post(`${url}/api/tasks/addtask?project=${id}`, { title });
    if (res.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("jpm_tasks", JSON.stringify(res.data.tasks));
      }
      dispatch({
        type: "add-task",
        payload: {
          project: res.data.project,
          tasks: res.data.tasks,
        },
      });
      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (res.data.error) {
      dispatch({
        type: "add-task",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "add-task",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const editTask =
  ({ id, title, status }) =>
  async (dispatch) => {
    const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";

    dispatch({
      type: "task-loading",
    });

    try {
      const res = await axios.put(`${url}/api/tasks/edittask?task=${id}`, {
        title,
        status,
      });

      if (res.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("jpm_tasks", JSON.stringify(res.data.tasks));
        }
        dispatch({
          type: "edit-task",
          payload: {
            project: res.data.project,
            tasks: res.data.tasks,
          },
        });
        toast.success("Task updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (res.data.error) {
        dispatch({
          type: "edit-task",
          payload: {
            error: res.data.error,
          },
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: "edit-task",
        payload: {
          error: error,
        },
      });
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const deleteTask = (id) => async (dispatch) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://just-project-manager.vercel.app"
      : "http://localhost:3000";
  dispatch({
    type: "task-loading",
  });

  try {
    const res = await axios.delete(`${url}/api/tasks/deletetask?taskId=${id}`);

    if (res.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("jpm_tasks", JSON.stringify(res.data.tasks));
      }
      dispatch({
        type: "delete-task",
        payload: {
          project: res.data.project,
          tasks: res.data.tasks,
        },
      });
      toast.success("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (res.data.error) {
      dispatch({
        type: "delete-task",
        payload: {
          error: res.data.error,
        },
      });
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch({
      type: "delete-task",
      payload: {
        error: error,
      },
    });
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
