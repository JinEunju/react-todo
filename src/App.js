import styles from './app.module.css';
import TodoBox from './components/TodoBox';
import TodoItem from './components/TodoItem';
import Button from './components/Button';
import { useState } from 'react';

const initTodoData = {
  title: '',
  content: '',
};

const formattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const houre = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${houre}:${minutes}`;
}

function App() {
  const [todoCnt, setTodoCnt] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todoData, setTodoData] = useState({ ...initTodoData });
  const [isError, setIsError] = useState({
    title: false,
    content: false,
  });

  const changeValue = ({ target, key }) => {
    const { value } = target;
    setTodoData({
      ...todoData,
      [key]: value,
    });
  }

  const addTodo = () => {
    const { title, content } = todoData;
    const isValid = title && content;

    setIsError({
      title: !title,
      content: !content,
    })

    if (!isValid) return;

    const newTodoItem = {
      ...todoData,
      key: todoCnt,
      createAt: formattedDate(),
      updatedAt: '-',
    };

    setTodoList([ newTodoItem, ...todoList ]);
    setTodoCnt(todoCnt + 1);
    setTodoData({ ...initTodoData });
  }

  const keyUpEnter = () => window.event.keyCode === 13 && addTodo();
  const deleteTodo = key => {
    setTodoList((prev) => {
      const newTodoArray = [...prev];
      const targetIndex = newTodoArray.findIndex(item => item.key === key);
      newTodoArray.splice(targetIndex, 1);

      return newTodoArray;
    })
  }
  const editTodo = key => {
    console.log('저장으로 바꿈', key)
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.todoListWrap}>
          <header className={styles.header}>TO DO LIST</header>
          <main>
            <TodoBox>
              <div className={styles.todoTitleBox}>
                <input
                  className={styles.addInput}
                  type="text"
                  placeholder="Title"
                  onChange={({ target }) => changeValue({ target, key: 'title' })}
                  value={todoData.title}
                  onKeyUp={keyUpEnter}
                />
                <Button size="large" color="blue" onClick={addTodo}>ADD</Button>
                {isError.title && <p className={styles.errorMessage}>ToDo Title를 입력해주세요</p>}
              </div>
              <div className={styles.todoContentBox}>
                <textarea
                  className={styles.addTextarea}
                  placeholder="Content"
                  onChange={({ target }) => changeValue({ target, key: 'content' })}
                  value={todoData.content}
                >
                </textarea>
                {isError.content && <p className={styles.errorMessage}>ToDo Content를 입력해주세요</p>}
              </div>
            </TodoBox>
            <TodoBox>
              {todoList.length > 0
                ? <ul className={styles.list}>
                  {todoList.map(todo => (
                    <TodoItem
                      key={todo.key}
                      data={todo}
                      editTodo={editTodo}
                      deleteTodo={deleteTodo}
                    >
                    </TodoItem>
                  ))}
                </ul>
                : <p>데이터가 없습니다.</p>}
            </TodoBox>
          </main>
        </div>
      </div>
      <div className={styles.modalWrap}>
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.item}>
                <input 
                  className={styles.viewInput}
                  type="text"
                  placeholder="Title"
                  value=""
                  />
                <Button size="small" color="blue">저장</Button>
              </div>
              <div className={styles.item}>
                <textarea
                  className={styles.viewContent}
                  placeholder="Content"
                  value=""
                >
                </textarea>
              </div>
              <div className={styles.item}>
                <dl className={styles.dateTime}>
                  <dt>생성일시</dt>
                  <dd></dd>
                </dl>
                <dl className={styles.dateTime}>
                  <dt>수정일시</dt>
                  <dd></dd>
                </dl>
              </div>
            </div>
            <button className={styles.closeButton}><span className={styles.closeButtonText}>닫기</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;