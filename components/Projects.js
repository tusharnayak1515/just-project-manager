import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import styles from '../styles/projects.module.css';
import { actionCreators } from '../redux';
import Project from './Project';

const Projects = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {projects} = useSelector(state=> state.projectReducer,shallowEqual);

  useEffect(()=> {
    if(user) {
      dispatch(actionCreators.getAllProjects());
    }
  }, [user, dispatch])

  return (
    <div className={styles.projects_container}>
        {projects && projects.length === 0 ? <p style={{color: "white", fontSize: "1.3rem"}}>No projects!</p> : projects?.map((p)=> {
          return <Project key={p?._id} project={p} />
        })}
    </div>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
//     const mycookie = context?.req?.headers?.cookie || "";
//     const cookieObj = cookie.parse(mycookie);
//     await store.dispatch(actionCreators.getAllProjects(cookieObj.user_token));
//     // await store.dispatch(actionCreators.something());
//   });

export default Projects