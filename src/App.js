import styles from './app.module.css';
import TodoBox from './components/TodoBox';
import TodoItem from './components/TodoItem';
import Button from './components/Button';
import { useState } from 'react';

function App() {
  const [todoCnt, setTodoCnt] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [isError, setIsError] = useState(false);

  const changeValue = ({ target, targetValue }) => {
    const { value } = target;
    targetValue(value);
    console.log(target, targetValue)
  }
  const addTodo = () => {
    if (todoText && todoContent) {
      setIsError(false);
      const newTodoItem = {
        key: todoCnt,
        titleValue: todoText,
        contentValue: todoContent,
      };
      setTodoList([newTodoItem, ...todoList]);
      setTodoCnt(todoCnt + 1);
      setTodoText('');
      setTodoContent('');
    } else {
      setIsError(true);
      console.log('ToDo를 입력해주세요');
    }
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

  return (
    <div className={styles.wrap}>
      <div className={styles.todoListWrap}>
        <header className={styles.header}>TO DO LIST</header>
        <main>
          <TodoBox>
            <div className={styles.todoTextBox}>
              <input
                className={styles.addInput}
                type="text"
                placeholder="Title"
                onChange={(event) =>changeValue({target: event.target, targetValue: setTodoText})}
                value={todoText}
                onKeyUp={keyUpEnter}
              />
              <Button size="large" color="blue" onClick={addTodo}>ADD</Button>
              {isError && <p className={styles.errorMessage}>ToDo Title를 입력해주세요</p>}
            </div>
            <div className={styles.todoContentBox}>
              <textarea
                className={styles.addTextarea}
                placeholder="내용을 입력하세요."
                onChange={(event) =>changeValue({target: event.target, targetValue: setTodoContent})}
                defaultValue={todoContent}
              >
              </textarea>
            </div>
          </TodoBox>
          <TodoBox>
            {todoList.length > 0
              ? <ul className={styles.list}>
                {todoList.map(todo => (
                  <TodoItem
                    key={todo.key}
                    title={todo.text}
                    content={todo.content}
                    deleteTodo={() => deleteTodo(todo.key)}
                  >
                  </TodoItem>
                ))}
              </ul>
              : <p>데이터가 없습니다.</p>}
          </TodoBox>
        </main>
      </div>
    </div>
  );
}

export default App;