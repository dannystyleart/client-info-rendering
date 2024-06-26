import React from 'react';
import styles from './header.module.css';

export const Header: React.FC<React.PropsWithChildren<{}>> = ({children}) => (
    <header className={styles.root}>
        {children}
    </header>
);
