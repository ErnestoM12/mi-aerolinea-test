import React from 'react';
import styles from '../styles/Modal.module.css'



const Modal = ({ children, isOpen, closeModal }) => {


    return (
        <article className={`${styles.modal}  ${isOpen && styles['is-open']}`}>
            <div className={styles['modal-container']}>
                <button type="button" onClick={closeModal} className={styles['modal-closed']}>X</button>
                {children}
            </div>
        </article>
    );
}

export default Modal