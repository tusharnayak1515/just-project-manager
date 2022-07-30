import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
import bannerImg1 from '../public/static/images/banner3.jpg';
// import bannerImg2 from '../public/static/images/bannerimg.jpg';
import { toast } from 'react-toastify';

import styles from '../styles/login.module.css';

const Login = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  const onValueChange = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onLogin = (e)=> {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(emailRegex.test(userDetails.email) === true && userDetails.password.length > 0) {
      dispatch(actionCreators.login(userDetails));
    }
    else {
      if(emailRegex.test(userDetails.email) === false) {
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
      else {
        toast.warn('Password cannot be empty!', {
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

  useEffect(() => {
    // console.log(router.isReady);
    if(user) {
      router.replace('/');
      // if(router.isReady) {
      //   router.replace('/');
      // }
    }
  }, [user]);

  return (
    <div className={styles.login}>
        <Head>
          <title>Login</title>
          <meta name="keywords" content="nextjs, next, project manager, todo list, login" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.leftDiv}>
          <div className={styles.left_wrapper}>
            <div className={styles.head_Div}>
            <h1 className={styles.head}>Login</h1>
            </div>
            <div className={styles.inputDiv}>
              <input type="email" name="email" placeholder='Email' value={userDetails.email} onChange={onValueChange} />
              <input type="password" name="password" placeholder='Password' value={userDetails.password} onChange={onValueChange} />
              <button onClick={onLogin}>Login</button>
            </div>
            <h3>New User? <Link href="/register"><b className={styles.registerText}>Register</b></Link></h3>
          </div>
        </div>

        <div className={styles.rightDiv}>
          <div className={styles.img_div}>
            <Image src={bannerImg1} height="400px" width="500px" style={{border: "none", borderRadius: "1rem"}} />
          </div>
          <h1>Manage and track your projects status online!</h1>
        </div>
    </div>
  )
}

export default Login;