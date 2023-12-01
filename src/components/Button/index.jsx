import styles from './index.module.css';

const Button = ({ children, size, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                `${styles.addButton} ${size === 'large'
                 ? styles.large
                  : styles.small}`
            }
        >
            {children}
        </button>
    );
};

export default Button;