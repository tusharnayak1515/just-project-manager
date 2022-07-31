import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactDom from 'react-dom';
import Spinner from '../public/static/images/loading8.svg';

import styles from '../styles/spinnermodal.module.css';

const SpinnerModal = () => {
  const topRef = useRef();

  useEffect(()=> {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return ReactDom.createPortal(
    <div className={styles.overlay} ref={topRef}>
      <div className={styles.modal}>
        <Image src={Spinner} alt="Loading Spinner" />
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default SpinnerModal