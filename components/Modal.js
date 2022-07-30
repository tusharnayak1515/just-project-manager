import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux";
import { toast } from "react-toastify";

import styles from "../styles/modal.module.css";

const Modal = ({ setShow, id, title, description, status }) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    id: id ? id : "",
    title: title ? title : "",
    description: description ? description : "",
    status: status ? status : "created",
  });
  const topRef = useRef();

  const onValueChange = (e) => {
    e.preventDefault();
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const onAdd = (e) => {
    e.preventDefault();
    if (project.title.length >= 4 && project.description.length >= 5) {
      dispatch(actionCreators.addProject(project));
      setShow(false);
    } else {
      if (project.title.length < 4) {
        toast.warn("Title must be minimum 4 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (project.description.length < 5) {
        toast.warn("Description must be minimum 5 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const onEdit = (e) => {
    e.preventDefault();
    if (project.title.length >= 4 && project.description.length >= 5) {
      dispatch(actionCreators.editProject(project));
      setShow(false);
      // router.push(`/projects/${id}`);
    } else {
      if (project.title.length < 4) {
        toast.warn("Title must be minimum 4 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (project.description.length < 5) {
        toast.warn("Description must be minimum 5 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return ReactDom.createPortal(
    <div className={styles.overlay} ref={topRef}>
      <div className={styles.modal}>
        <h1 className={styles.project_head}>{id ? "Edit Project" : "Add Project"}</h1>
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={onValueChange}
          placeholder="Project Title"
        />
        <input
          type="text"
          name="description"
          value={project.description}
          onChange={onValueChange}
          placeholder="Project Description"
        />
        {id && (
          <select
            name="status"
            id="status"
            value={project.status}
            onChange={onValueChange}
          >
            <option value="created">created</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        )}
        <button onClick={id ? onEdit : onAdd} className={styles.add_btn}>
          {id ? "Edit" : "Submit"}
        </button>
        <button onClick={onClose} className={styles.close_btn}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
