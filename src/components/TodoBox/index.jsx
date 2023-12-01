import styles from './index.module.css';

const TodoBox = ({ children }) => {
    return (
        <div className={styles.todoBox}>
            {children}
        </div>
    );
};

export default TodoBox;