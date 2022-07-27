import Link from 'next/link';
import React from 'react';

import styles from '../styles/project.module.css';

const Project = ({project}) => {
  let status = project.status;
  let created = status === "created";
  let inProgress = status === "in progress";
  let completed = status === "completed";
  return (
    <div className={styles.project_box} style={{backgroundColor: created ? "white" : inProgress ? "orange" : completed ? "green" : "white"}}>
        <Link href={`/projects/${project?._id}`}><h3>{project?.title}</h3></Link>
    </div>
  )
}

export default Project;