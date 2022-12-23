import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {useEffect} from "react";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import clsx from 'clsx';


interface IModalProps {
    onClose: () => void;
    title?: string;
}

export const Modal: FC<IModalProps> = ({onClose, title, children}) => {
    const ESC_KEYCODE = 27;
    const modalRoot: any = document.getElementById("modals");

    const pressEsc = (e: React.KeyboardEvent<HTMLElement>) => {
        if ((e.charCode || e.keyCode) === ESC_KEYCODE) {
            onClose();
        }
    };

    useEffect(() => {
        // @ts-ignore
        document.body.addEventListener('keydown', pressEsc);
        return () => {
            // @ts-ignore
            document.body.removeEventListener('keydown', pressEsc);
        }
    }, []);


    return ReactDOM.createPortal((
        <div id="modal" onClick={onClose}>
            <ModalOverlay>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={clsx(styles.header, "ml-10 mr-10 mt-10")}>
                        <div className={styles.close}>
                            <CloseIcon type="primary" onClick={onClose}/>
                        </div>
                        <div className={styles.title}>
                            {title ? <h3 className={clsx("mt-3 text text_type_main-large")}>
                                {title}</h3> : null}
                        </div>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </div>
    ), modalRoot)
}

export default Modal;