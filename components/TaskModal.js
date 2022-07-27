import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';

import styles from '../styles/modal.module.css';

const TaskModal = ({id, setShow, tid, title, status}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [task, setTask] = useState({id: tid ? tid : '', title: title ? title : '', status: status ? status : ''});

    const onValueChange = (e)=> {
        e.preventDefault();
        setTask({...task, [e.target.name]: e.target.value});
    }

    const onClose = (e)=> {
        e.preventDefault();
        setShow(false);
    }

    const onAdd = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.addTask(id,task.title));
        setShow(false);
    }

    const onEdit = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.editTask(task));
        setShow(false);
    }

    const onTaskDelete = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.deleteTask(tid));
        setShow(false);
        router.push(`/projects/${id}`);
    }

    return ReactDom.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <input type="text" name="title" value={task.title} onChange={onValueChange} placeholder="Task Title" />
                {tid && <select name="status" id="status" value={task.status} onChange={onValueChange}>
                    <option value="created">created</option>
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                </select>}
                <button onClick={tid ? onEdit : onAdd} className={styles.add_btn}>{tid ? 'Edit' : 'Submit'}</button>
                {tid && <button onClick={onTaskDelete} className={styles.delete_btn}>Delete</button>}
                <button onClick={onClose} className={styles.close_btn}>Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default TaskModal;