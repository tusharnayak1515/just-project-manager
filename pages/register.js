import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
// import bannerImg1 from '../public/static/images/banner3.jpg';
import bannerImg2 from '../public/static/images/bannerimg.jpg';

import styles from '../styles/register.module.css';

const Register = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  const onValueChange = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onRegister = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.register(userDetails));
  }

  useEffect(() => {
    if(user) {
        router.push('/');
    }
  }, [user]);
  

  return (
    <div className={styles.register}>
        <Head>
          <title>Register</title>
          <meta name="keywords" content="nextjs, next, project manager, todo list, register" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.leftDiv}>
          <div className={styles.left_wrapper}>
            <div className={styles.head_Div}>
            <h1 className={styles.head}>Register</h1>
            </div>
            <div className={styles.inputDiv}>
              <input type="text" name="name" placeholder='Name' value={userDetails.name} onChange={onValueChange} />
              <input type="email" name="email" placeholder='Email' value={userDetails.email} onChange={onValueChange} />
              <input type="password" name="password" placeholder='Password' value={userDetails.password} onChange={onValueChange} />
              <button onClick={onRegister}>Register</button>
            </div>
            <h3>Have a account? <Link href="/login"><b className={styles.loginText}>Login</b></Link></h3>
          </div>
        </div>

        <div className={styles.rightDiv}>
          <div className={styles.img_div}>
            <Image src={bannerImg2} height="400px" width="500px" style={{border: "none", borderRadius: "1rem"}} />
          </div>
          <h1>Manage and track your projects status online!</h1>
        </div>
    </div>
  )
}

export default Register;