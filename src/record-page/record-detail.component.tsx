import React from "react";
import styles from './record-detail.module.css';

export const RecordDetail: React.FC<React.PropsWithChildren> = ({ children }) => (
    <pre className={styles.root}>
        {children}
    </pre>
);

export const RecordDetailImage: React.FC<
    React.HTMLProps<HTMLImageElement>
> = (props) => (
    <span className={styles.imageRoot}>
        <img {...props} />
    </span>
)