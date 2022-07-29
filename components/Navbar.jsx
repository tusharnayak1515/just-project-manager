import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
import { useRouter } from 'next/router';
import ReactAwesomeClock from 'react-awesome-clock';

import styles from '../styles/navbar.module.css';
import Clock from './Clock';

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
        {/* <ReactAwesomeClock style={{ color: "white", fontSize: 20, textShadow: "0 0 10px grey", fontFamily: "aerial" }} clockSeparator=" " /> */}
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