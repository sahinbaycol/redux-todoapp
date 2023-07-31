import {useEffect} from "react";
import { useSelector,  } from "react-redux/es/hooks/useSelector";
import {  removeTodoAsync, getTodosAsync,toggleTodoAsync } from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";



function TodoList() {
  const dispatch = useDispatch();
  
  const filteredTodos = useSelector(selectFilteredTodos)
  const isLoading = useSelector((state)=> state.todos.isLoading);
  const error = useSelector((state)=> state.todos.error)

  useEffect(() => {
    dispatch(getTodosAsync())
  },[dispatch])

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure?")) {
    await  dispatch(removeTodoAsync(id));
    }
  };

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({id, data:{ completed }}));
  }

  if(isLoading) {
    return <Loading />
  }

  if(error){
    return <Error message={error} />
  }
  

  return (
    <ul className="todo-list">
      {/* <li className="completed">
				<div className="view">
					<input className="toggle" type="checkbox" />
					<label>Learn JavaScript</label>
					<button className="destroy"></button>
				</div>
			</li> */}

      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              onClick={() => handleDestroy(item.id)}
              className="destroy"
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
