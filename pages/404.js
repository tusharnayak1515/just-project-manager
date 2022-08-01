import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import invalidBanner from '../public/static/images/notFound.gif';

import styles from '../styles/404.module.css';

const Not_Found = () => {
  const router = useRouter();

  const onRightCLick = (e)=> {
    e.preventDefault();
  }

  const goBack = (e)=> {
    e.preventDefault();
    router.replace("/");
  }

  return (
    <div className={styles.notFound}>
        <Head>
          <title>Not Found</title>
          <meta
            name="keywords"
            content={"nextjs, next, project manager, todo list, invalid"}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image src={invalidBanner} alt="Invalid Page gif" onContextMenu={onRightCLick} />
        <h1>PAGE NOT FOUND</h1>
        <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Not_Found;