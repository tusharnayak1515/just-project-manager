import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, shallowEqual ,useDispatch } from 'react-redux';
import { actionCreators } from '../redux';
import { wrapper } from '../redux/store';
import * as cookie from 'cookie';
import Projects from '../components/Projects';

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  useEffect(()=> {
    if(!user) {
      router.push('/login');
    }
    else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getAllProjects());
    }
  }, [user]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Just-Project Manager</title>
        <meta name="keywords" content="nextjs, next, project manager, todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Just-Project Manager
        </h1>

        <h1 className={styles.description}>
          My Projects
        </h1>

        <Projects />
        
      </main>

      <footer className={styles.footer}>
        <h3>Copyrights © JustCommunity</h3>
      </footer>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  const mycookie = context?.req?.headers?.cookie || "";
  const cookieObj = cookie.parse(mycookie);
  await store.dispatch(actionCreators.profile(cookieObj.user_token));
  await store.dispatch(actionCreators.getAllProjects(cookieObj.user_token));
  // await store.dispatch(actionCreators.something());
});