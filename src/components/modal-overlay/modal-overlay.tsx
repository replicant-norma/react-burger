import React, {FC} from 'react';
import styles from './modal-overlay.module.css';


export const ModalOverlay : FC = ({children}) => {

    return (
        <div className={styles.modal}>
            <div className={styles.overlay}></div>
            {children}
        </div>

    )
}

export default ModalOverlay;
