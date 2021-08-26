import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from "react";
import {Box, CloseIcon, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import clsx from 'clsx';
import PropTypes from "prop-types";



function Modal(props){
    const[isOpen, setIsOpen] = useState(false);
    const modalRoot = document.getElementById("modals");

    useEffect(()=>{
        setIsOpen(props.isOpen);
    }, [props.isOpen]);


    if (!isOpen) return null;

    return ReactDOM.createPortal((
        <>
            <ModalOverlay>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={clsx(styles.header,"ml-10 mr-10 mt-10")}>
                    <div className={styles.close}>
                        <CloseIcon type="primary" onClick={props.onClose}  />
                    </div>
                    <div className={styles.title}>
                        {props.title ? <h3 className={clsx("mt-3 text text_type_main-large")}>
                            {props.title}</h3> : null}
                    </div>
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
            </ModalOverlay>
        </>
    ), modalRoot)
}

Modal.propTypes ={
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default Modal;