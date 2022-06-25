import React from 'react';
import Link from 'next/link';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <h1>Logo</h1>
        </div>
        <div className={styles.menus}>
          <Link href='/'><a>Dashboard</a></Link>
          <Link href='/about'><a>About</a></Link>
          <Link href='/contact'><a>Contact</a></Link>
        </div>
      </div>
      <div className={styles.middle}>
        <input type="text" placeholder='Search your projects' />
      </div>
      <div className={styles.rightSide}>
        <h1>+</h1>
        <Link href='/profile'><a>Profile</a></Link>
        <Link href='/'><a>Logout</a></Link>
      </div>
    </nav>
  )
}

export default Navbar