import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
// import invalidBanner from '../public/static/images/invalid6.jpg';
import invalidBanner from '../public/static/images/notFound.gif';

import styles from '../styles/404.module.css';

const Not_Found = () => {
  const onRightCLick = (e)=> {
    e.preventDefault();
  }

  return (
    <div className={styles.invalid}>
        <Head>
          <title>Not Found</title>
          <meta
            name="keywords"
            content={"nextjs, next, project manager, todo list, invalid"}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Image src={invalidBanner} rel="Invalid Page gif" height="730px" width="1536px" /> */}
        <Image src={invalidBanner} rel="Invalid Page gif" height="400px" width="500px" onContextMenu={onRightCLick} />
    </div>
  )
}

export default Not_Found;