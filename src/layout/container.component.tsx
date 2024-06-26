import React from "react";
import styles from './container.module.css'

export const Container: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <div className={styles.root}>
        {children}
    </div>
);
