import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { actionCreators } from "../../redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Head from "next/head";
import Modal from "../../components/Modal";
import TaskModal from "../../components/TaskModal";

import styles from "../../styles/projectpage.module.css";

const ProjectPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { project } = useSelector(state => state.projectReducer,shallowEqual);
  const { tasks, task, isLoading } = useSelector((state) => state.taskReducer, shallowEqual);
  const [projectShow, setProjectShow] = useState(false);
  const [show, setShow] = useState(false);
  const [taskShow, setTaskShow] = useState(false);

  const onEditClick = (e) => {
    e.preventDefault();
    setProjectShow(true);
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(actionCreators.deleteProject(project?._id));
    router.replace("/");
  };

  // const onTaskEdit = (e,id)=> {
  //   e.preventDefault();
  //   dispatch(actionCreators.getTask(id));
  //   setTaskShow(true);
  // }

  // const onTaskDelete = (e,id)=> {
  //   e.preventDefault();
  //   dispatch(actionCreators.deleteTask(id));
  //   router.push(`/projects/${router?.query?.pid}`);
  // }

  const onCardClick = (e,id)=> {
    e.preventDefault();
    dispatch(actionCreators.getTask(id));
    setTaskShow(true);
  }

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      if (router.isReady) {
        // console.log("yes");
        dispatch(actionCreators.getProject(router.query.pid));
        dispatch(actionCreators.getAllTasks(router.query.pid));
      }
    }
    return ()=> {
        dispatch(actionCreators.resetTask());
    }
  }, [user, router]);

  return (
    <div className={styles.projectpage}>
      <Head>
        <title>{project?.title}</title>
        <meta
          name="keywords"
          content={`nextjs, next, project manager, todo list, ${project?.title}, ${project?.description}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {show && (
        <TaskModal
          setShow={setShow}
          id={router.isReady ? router.query.pid : null}
        />
      )}
      {taskShow && task && !isLoading && (
        <TaskModal
          setShow={setTaskShow}
          id={router.isReady ? router.query.pid : null}
          tid={task?._id}
          title={task?.title}
          status={task?.status}
        />
      )}
      {projectShow && (
        <Modal
          setShow={setProjectShow}
          id={project?._id}
          title={project?.title}
          description={project?.description}
          status={project?.status}
        />
      )}
      <h1 className={styles.title}>{project?.title}</h1>
      <p className={styles.description}>{project?.description}</p>
      <div className={styles.icons}>
        <h2 className={styles.editIcon} onClick={onEditClick}>
          <FaEdit />
        </h2>
        <h2 className={styles.deleteIcon} onClick={onDelete}>
          <FaTrash />
        </h2>
      </div>
      <h1 className={styles.subhead}>Tasks for {project?.title}</h1>
      <div className={styles.tasks_container}>
        {tasks &&
          tasks?.length !== 0 &&
          tasks?.map((t) => {
            let status = t?.status;
            let created = status === "created";
            let inProgress = status === "in progress";
            let completed = status === "completed";
            return (
              <div
                className={`${styles.task_card} ${styles.task_items}`}
                key={t?._id}
                style={{
                  backgroundColor: created
                    ? "white"
                    : inProgress
                    ? "orange"
                    : completed
                    ? "rgb(1, 209, 1)"
                    : "white",
                }}
                onClick={(e)=> onCardClick(e,t?._id)}
              >
                <h2 className={styles.task_title}>{t?.title.substring(0,22)}</h2>
              </div>
            );
          })}
        <div className={styles.task_card} style={{ backgroundColor: "white" }}>
          <h2
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
            }}
            className={styles.add}
          >
            <FaPlus color="#010125" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    await store.dispatch(
      actionCreators.getProject(params.pid, cookieObj.user_token)
    );
    await store.dispatch(
      actionCreators.getAllTasks(params.pid, cookieObj.user_token)
    );
    // await store.dispatch(actionCreators.something());
  }
);

export default ProjectPage;
