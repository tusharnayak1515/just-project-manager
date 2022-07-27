import { Fragment, useState } from 'react';
import { wrapper } from '../redux/store';
import { useSelector, shallowEqual } from 'react-redux';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

import '../styles/globals.css';
import Modal from '../components/Modal';

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const { user } = useSelector(state => state.userReducer, shallowEqual);
  return <Fragment>
    {show && <Modal setShow={setShow} />}
    {user && <Navbar setShow={setShow} />}
    <Component {...pageProps} />
  </Fragment>
}

export default wrapper.withRedux(MyApp);