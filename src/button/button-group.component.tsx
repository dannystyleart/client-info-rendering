import React from "react"
import styles from './button-group.module.css'

type ButtonGroupProps = React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement>
>

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    className,
    ...props
}) => (<div className={[className, styles.root].join(' ')} {...props} />)

