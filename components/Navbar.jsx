import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
import { useRouter } from 'next/router';
import Clock from './Clock';
import { RiHome2Fill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';

import styles from '../styles/navbar.module.css';

const Navbar = ({setShow}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  if(!user) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&family=Mochiy+Pop+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.phone_nav}>
        <Link href="/"><h1><RiHome2Fill /></h1></Link>
        {router.pathname === '/' && <h1 onClick={(e)=> {e.preventDefault();setShow(true)}}><IoMdAdd /></h1>}
        <Link href="/profile"><h1><CgProfile /></h1></Link>
        <h1><MdLogout /></h1>
      </div>

      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <h1>JPM</h1>
        </div>
        <div className={styles.menus}>
          <Link href='/'><h3 className={router.pathname === '/' ? styles.activelink : ''}>Dashboard</h3></Link>
        </div>
      </div>
      <div className={styles.middle}>
        {/* <input type="text" placeholder='Search your projects' /> */}
        <Clock />
      </div>
      <div className={styles.rightSide}>
        {router.pathname === '/' && <h1 onClick={(e)=> {e.preventDefault();setShow(true)}}>+</h1>}
        <Link href='/profile'><h3 className={router.pathname === '/profile' ? styles.activelink: ''}>Profile</h3></Link>
        <h3 onClick={onLogout}><a>Logout</a></h3>
      </div>
    </nav>
  )
}

export default Navbar;