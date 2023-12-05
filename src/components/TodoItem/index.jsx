import styles from './index.module.css';
import Button from '../Button';
import { useState } from 'react';

const TodoItem = ({ data, openModal, deleteTodo }) => {
  const { key, title, content, createdAt, updatedAt } = data;
  const [doneTodo, setDoneTodo] = useState(false);
  function completeTodo() {
    setDoneTodo(!doneTodo);
  }
  return (
    <li className={styles.item} data-key={key}>
      <div className={styles.itemInner}>
        <p
          className={`${styles.title} ${doneTodo ? styles.completion : ''}`}
          onClick={completeTodo}
        >
          {title}
        </p>
        <Button size="small" color="blue" onClick={() => openModal(key)}>수정</Button>
        <Button size="small" color="red" onClick={deleteTodo}>삭제</Button>
      </div>
      <div className={styles.itemInner}>
        <p
          className={styles.content}>
          {content}
        </p>
      </div>
      <div className={styles.itemInner}>
        <dl className={styles.dateTime}>
          <dt>생성일시</dt>
          <dd>{createdAt}</dd>
        </dl>
        <dl className={styles.dateTime}>
          <dt>수정일시</dt>
          <dd>{updatedAt}</dd>
        </dl>
      </div>
    </li>
  );
};

export default TodoItem;