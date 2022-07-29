import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
// import bannerImg1 from '../public/static/images/banner3.jpg';
import bannerImg2 from '../public/static/images/bannerimg.jpg';
import { toast } from 'react-toastify';

import styles from '../styles/register.module.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector(state=> state.userReducer,shallowEqual);

  const onValueChange = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onRegister = (e)=> {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if(userDetails.name.length >= 4 && emailRegex.test(userDetails.email) === true && passwordRegex.test(userDetails.password)) {
        dispatch(actionCreators.register(userDetails));
    }
    else {
        if(userDetails.name.length < 4) {
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
        else if(userDetails.email.length === 0 || emailRegex.test(userDetails.email) === false) {
            toast.warn('Enter a valid Email!', {
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
            toast.warn('Password must be minimum 8 characters long and a combination of uppercase,lowercase,spacial characters and numbers!', {
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
    if(user) {
        router.push('/');
    }
  }, [user]);

  if(isLoading) {
    return <LoadingSpinner />
  }

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