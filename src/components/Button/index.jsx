import styles from './index.module.css';

const Button = ({ children, size, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        `${styles.addButton} ${size === 'large'
          ? styles.large
          : styles.small}
                  ${color === 'blue'
          ? styles.blue
          : styles.red}`
      }
    >
      {children}
    </button>
  );
};

export default Button;