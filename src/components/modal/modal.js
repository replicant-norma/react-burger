import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from "react";
import {Box, CloseIcon, Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import clsx from 'clsx';
import PropTypes from "prop-types";


function Modal(props) {
    const ESC_KEYCODE = 27;
    const modalRoot = document.getElementById("modals");

    const pressEsc = (e) => {
        if ((e.charCode || e.keyCode) === ESC_KEYCODE) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener('keydown', pressEsc);
        return () => {
            document.body.removeEventListener('keydown', pressEsc);
        }
    }, []);


    return ReactDOM.createPortal((
        <div id="modal" onClick={props.onClose}>
            <ModalOverlay>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={clsx(styles.header, "ml-10 mr-10 mt-10")}>
                        <div className={styles.close}>
                            <CloseIcon type="primary" onClick={props.onClose}/>
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
        </div>
    ), modalRoot)
}

/*Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}*/

export default Modal;