import styles from './ButtonLink.module.css'

const ButtonLink = props => {
    return <button className={styles.button} onClick={props.onClick}>{props.children}</button>
}

export default ButtonLink;