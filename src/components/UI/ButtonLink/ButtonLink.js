import styles from "./ButtonLink.module.css";

const ButtonLink = (props) => {
    // link-like button component, can also be used as normal button via props
    return (
        <button
            className={`${styles.button} 
                        ${props.highlight && styles.highlight} 
                        ${props.hover && styles.hover} 
                        ${props.fullButton && styles.fullButton}
                        ${props.className}
                      `}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default ButtonLink;
