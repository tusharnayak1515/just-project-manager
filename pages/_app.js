import { Fragment, useState } from 'react';
import { wrapper } from '../redux/store';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});
import Modal from '../components/Modal';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  return <Fragment>
    {show && <Modal setShow={setShow} />}
    <Navbar setShow={setShow} />
    <Component {...pageProps} />
    <ToastContainer />
  </Fragment>
}

export default wrapper.withRedux(MyApp);