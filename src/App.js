import styles from './app.module.css';
import TodoBox from './components/TodoBox';
import TodoItem from './components/TodoItem';
import Button from './components/Button';
import { useState } from 'react';

function App() {
  const [todoCnt, setTodoCnt] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isError, setIsError] = useState(false);

  const changeValue = ({ target }) => {
    const { value } = target;
    setTodoText(value);
  }
  const addTodo = () => {
    if (todoText) {
      setIsError(false);
      const newTodoItem = {
        key: todoCnt, 
        value: todoText
      };
      
      setTodoList([newTodoItem, ...todoList]);
      setTodoCnt(todoCnt + 1);
      setTodoText('');
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
            <input 
              className={styles.addInput}
              type="text" 
              placeholder="Task to be done"
              onChange={changeValue}
              value={todoText}
              onKeyUp={keyUpEnter}
            />
            <Button size="large" onClick={addTodo}>ADD</Button>
            {isError && <p className={styles.errorMessage}>ToDo를 입력해주세요</p>}
          </TodoBox>
          <TodoBox>
            {todoList.length > 0 
            ? <ul className={styles.list}>
                {todoList.map(todo => (
                  <TodoItem 
                    key={todo.key} 
                    deleteTodo={() => deleteTodo(todo.key)}
                  >
                    {todo.value}
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
