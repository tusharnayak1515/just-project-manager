import React, { useEffect, useState } from 'react';
import * as cookie from 'cookie';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import { actionCreators } from '../redux';
import { wrapper } from '../redux/store';
import Head from 'next/head';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

import styles from '../styles/profile.module.css';
import SpinnerModal from '../components/SpinnerModal';

const profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, profile, userLoading} = useSelector((state)=> state.userReducer,shallowEqual);
  const [edit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({name: profile ? profile?.name : "", email: profile ? profile?.email : ""});

  const onChangeHandler = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onEditClick = (e)=> {
    e.preventDefault();
    setEdit(true);
  }

  const onEdit = (e)=> {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(userDetails.name.length >= 4 && regex.test(userDetails.email) === true) {
      dispatch(actionCreators.editProfile(userDetails));
      setEdit(false);
    }
    else {
      if(userDetails.name.length < 4 ) {
        toast.warn('Name must be minimum 4 characters long!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if(userDetails.email.length === 0 || regex.test(userDetails.email) === false) {
        toast.warn('Enter a valid email!', {
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
  }

  const onCancelClick = (e)=> {
    e.preventDefault();
    setEdit(false);
  }

  useEffect(()=> {
    if(!user) {
      router.push("/login");
    }
    else {
      dispatch(actionCreators.profile());
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.profile_div}>
      <Head>
        <title>Profile</title>
        <meta name="keywords" content="nextjs, next, project manager, todo list, profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {userLoading && <SpinnerModal />}

      <h1 className={styles.profile_head}>Profile</h1>

      <div className={styles.box}>
        <div className={styles.flexDiv}>
          <h2>Name: </h2>
          <input type="text" name="name" value={userDetails.name} onChange={onChangeHandler} disabled={!edit} />
          <h2 className={styles.icons} onClick={onEditClick}><MdEdit /></h2>
        </div>

        <div className={styles.flexDiv}>
          <h2>Email: </h2>
          <input type="email" name="email" value={userDetails.email} onChange={onChangeHandler} disabled={!edit} />
          <h2 className={styles.icons} onClick={onEditClick}><MdEdit /></h2>
        </div>

        {edit && <div className={styles.btnDiv}>
          <button className={styles.editbtn} onClick={onEdit}>Edit</button>
          <button className={styles.cancelbtn} onClick={onCancelClick}>Cancel</button>
        </div>}
      </div>

    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  const mycookie = context?.req?.headers?.cookie || "";
  const cookieObj = cookie.parse(mycookie);
  await store.dispatch(actionCreators.profile(cookieObj.user_token));
});

export default profile;