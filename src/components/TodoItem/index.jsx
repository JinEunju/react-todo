import styles from './index.module.css';
import Button from '../Button';
import { useState } from 'react';

const TodoItem = ({ title, content, deleteTodo }) => {
  const [doneTodo, setDoneTodo] = useState(false);
  function completeTodo() {
    setDoneTodo(!doneTodo);
  }
  return (
    <li className={styles.item}>
      <div className={styles.itemInner}>
        <p
          className={`${styles.title} ${doneTodo ? styles.completion : ''}`}
          onClick={completeTodo}
        >
          {title}
        </p>
        <Button size="small" color="blue" onClick={deleteTodo}>수정</Button>
        <Button size="small" color="red" onClick={deleteTodo}>삭제</Button>
      </div>
      <div className={styles.itemInner}>
        <p
          className={styles.content}>
          {content}
        </p>
      </div>
      <div className={styles.itemInner}>
        <dl>
          <dt>생성일시</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>수정일시</dt>
          <dd></dd>
        </dl>
      </div>
    </li>
  );
};

export default TodoItem;