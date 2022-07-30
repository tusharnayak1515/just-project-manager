import { Fragment, useEffect, useState } from "react";
import { wrapper } from "../redux/store";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});
import Modal from "../components/Modal";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Router from "next/router";
import Nprogress from "nprogress";
Nprogress.configure({ showSpinner: false, easing: 'ease', speed: 1000, parent: 'html' });

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    Router.events.on("routeChangeStart", ()=> {
      Nprogress.start();
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", ()=> {
      Nprogress.done();
      setLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        {loading && <title>Just-Project Manager</title>}
        <meta name="keywords" content="nextjs, next, project manager, todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <LoadingSpinner />}
      {show && <Modal setShow={setShow} />}
      <Navbar setShow={setShow} />
      {!loading && <Component {...pageProps} />}
      <ToastContainer />
    </Fragment>
  );
}

export default wrapper.withRedux(MyApp);
