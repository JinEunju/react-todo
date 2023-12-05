import styles from './app.module.css';
import TodoBox from './components/TodoBox';
import TodoItem from './components/TodoItem';
import Button from './components/Button';
import Modal from './components/Modal';
import { useState } from 'react';
import { formattedDate } from './utils/common'

const initTodoData = {
  title: '',
  content: '',
};



function App() {
  const [todoCnt, setTodoCnt] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todoData, setTodoData] = useState({ ...initTodoData });
  const [isError, setIsError] = useState({
    title: false,
    content: false,
  });
  const [modalKey, setModalKey] = useState(null);

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
      createdAt: formattedDate(),
      updatedAt: '-',
    };

    setTodoList([ newTodoItem, ...todoList ]);
    setTodoCnt(todoCnt + 1);
    setTodoData({ ...initTodoData });
  }


  const openModal = (key) => {
    setModalKey(key);
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    setModalKey(null);
    document.body.style.overflow = "auto";
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

  const editTodo = data => {
    console.log(data);
    setTodoList(prevList => prevList.map(item => {
      if (item.key === data.key) return data;
      return item;
    }))
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
                      openModal={openModal}
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
      {modalKey !== null 
      && <Modal closeModal={closeModal} editTodo={editTodo} data={todoList.find(item => item.key === modalKey)} />}
    </>
  );
}

export default App;