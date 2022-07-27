import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';

import styles from '../styles/modal.module.css';

const Modal = ({setShow, id, title, description, status}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [project, setProject] = useState({id: id ? id : '',title: title ? title : "", description: description ? description : "", status: status ? status : 'created'});

    const onValueChange = (e)=> {
        e.preventDefault();
        setProject({...project, [e.target.name]: e.target.value});
    }

    const onClose = (e)=> {
        e.preventDefault();
        setShow(false);
    }

    const onAdd = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.addProject(project));
        setShow(false);
    }

    const onEdit = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.editProject(project));
        setShow(false);
        router.push(`/projects/${id}`);
    }

    return ReactDom.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <input type="text" name="title" value={project.title} onChange={onValueChange} placeholder="Project Title" />
                <input type="text" name="description" value={project.description} onChange={onValueChange} placeholder="Project Description" />
                <select name="status" id="status" value={project.status} onChange={onValueChange}>
                    <option value="created">created</option>
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                </select>
                <button onClick={id ? onEdit : onAdd} className={styles.add_btn}>{id ? 'Edit' : 'Submit'}</button>
                <button onClick={onClose} className={styles.close_btn}>Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal;