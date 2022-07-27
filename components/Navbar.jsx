import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { wrapper } from '../redux/store';
import { actionCreators } from '../redux';
import { useRouter } from 'next/router';

import styles from '../styles/navbar.module.css';
import Modal from './Modal';

const Navbar = ({setShow}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <h1>JPM</h1>
        </div>
        <div className={styles.menus}>
          <Link href='/'><h3 className={router.pathname === '/' ? styles.activelink : ''}>Dashboard</h3></Link>
          <Link href='/about'><h3 className={router.pathname === '/about' ? styles.activelink : ''}>About</h3></Link>
          <Link href='/contact'><h3 className={router.pathname === '/contact' ? styles.activelink : ''}>Contact</h3></Link>
        </div>
      </div>
      <div className={styles.middle}>
        <input type="text" placeholder='Search your projects' />
      </div>
      <div className={styles.rightSide}>
        <h1 onClick={(e)=> {e.preventDefault();setShow(true)}}>+</h1>
        <Link href='/profile'><h3 className={router.pathname === '/profile' ? styles.activelink: ''}>{profile?.name}</h3></Link>
        <h3 onClick={onLogout}><a>Logout</a></h3>
      </div>
    </nav>
  )
}

export default Navbar;