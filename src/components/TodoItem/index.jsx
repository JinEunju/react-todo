import styles from './index.module.css';
import Button from '../Button';
import { useState } from 'react';

const TodoItem = ({ children, deleteTodo }) => {
  const [doneTodo, setDoneTodo] = useState(false);
  function completeTodo() {
    setDoneTodo(!doneTodo);
  }
  return (
    <li className={styles.item}>
      <p 
        className={`${styles.text} ${doneTodo ? styles.completion : ''}`} 
        onClick={completeTodo}
      >
        {children}
      </p>
      <Button size="small" onClick={deleteTodo}>삭제</Button>
    </li>
  );
};

export default TodoItem;