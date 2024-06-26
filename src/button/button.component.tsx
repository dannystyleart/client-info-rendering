import React, { useMemo } from 'react';
import styles from './button.module.css'

type ButtonProps = React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'large' }
>

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    ...props
}) => {
    const classNames = useMemo(() => [
        styles.root,
        variant === 'large' ? styles.large : undefined,
        className
    ].filter(Boolean).join(' '), [className, variant]);

    return (
        <button className={classNames} {...props} />
    )
};
