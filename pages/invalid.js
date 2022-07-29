import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import invalidBanner from '../public/static/images/invalid6.jpg';

import styles from '../styles/invalid.module.css';

const Invalid = () => {
  return (
    <div className={styles.invalid}>
        <Head>
          <title>Invalid</title>
          <meta
            name="keywords"
            content={"nextjs, next, project manager, todo list, invalid"}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image src={invalidBanner} rel="Invalid Page gif" height="730px" width="1536px" />
    </div>
  )
}

export default Invalid;