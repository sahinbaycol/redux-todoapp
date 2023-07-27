import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toggle, destroy, selectFilteredTodos } from "../redux/todos/todosSlice";
import { useDispatch } from "react-redux";



function TodoList() {
  const dispatch = useDispatch();
  
  const filteredTodos = useSelector(selectFilteredTodos)

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroy(id));
    }
  };
  

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
              onChange={() => dispatch(toggle({ id: item.id }))}
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
