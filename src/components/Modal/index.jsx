import styles from './index.module.css';
import Button from '../Button';
import { useState } from 'react';
import { formattedDate } from '../../utils/common';

const Modal = ({ closeModal, editTodo, data }) => {
  const { title, content, createdAt, updatedAt } = data;
  const [modalData, setModalData] = useState({ title, content });
  const changeEditValue = ({ target, key }) => {
    const { value } = target;
    setModalData({
      ...modalData,
      [key]: value
    });
  }
  const sendTodoData = () => {
    const newTodo = {
      ...data,
      title: modalData.title,
      content: modalData.content,
      updatedAt: formattedDate()
    }
    editTodo(newTodo);
    closeModal();
  }

  console.log(modalData);

  return (
    <div onClick={closeModal} className={styles.modalWrap}>
      <div className={styles.modalContainer}>
        <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalItem}>
              <input 
                className={styles.viewInput}
                type="text"
                placeholder="Title"
                value={modalData.title}
                onChange={({ target }) => changeEditValue({ target, key: 'title' })}
              />
              <Button size="small" color="blue" onClick={sendTodoData}>저장</Button>
            </div>
            <div className={styles.modalItem}>
              <textarea
                className={styles.viewContent}
                placeholder="Content"
                value={modalData.content}
                onChange={({ target }) => changeEditValue({ target, key: 'content' })}
              >
              </textarea>
            </div>
            <div className={styles.modalItem}>
              <dl className={styles.dateTime}>
                <dt>생성일시</dt>
                <dd>{createdAt}</dd>
              </dl>
              <dl className={styles.dateTime}>
                <dt>수정일시</dt>
                <dd>{updatedAt}</dd>
              </dl>
            </div>
          </div>
          <button onClick={closeModal} className={styles.closeButton}><span className={styles.closeButtonText}>닫기</span></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;