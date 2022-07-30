import Image from 'next/image';
import React from 'react';
import ReactDom from 'react-dom';
// import Spinner from '../public/static/images/processloading.gif';
import Spinner from '../public/static/images/loading8.svg';

import styles from '../styles/spinnermodal.module.css';

const SpinnerModal = () => {
  return ReactDom.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image src={Spinner} alt="Loading Spinner" />
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default SpinnerModal