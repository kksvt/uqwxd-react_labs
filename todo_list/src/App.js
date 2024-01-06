import React, {useState,useEffect} from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  function handlesubmit(e) {
    e.preventDefault();
    let todo = document.getElementById('todoAdd').value;
    console.log(todo);
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    }
    else {
      alert('Enter valid task');
    }
    document.getElementById('todoAdd').value = "";
  }
  
  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    if (id === todoEditing) {
      setTodoEditing(null);
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      todo.completed = !todo.completed;
      return todo;
    })
    setTodos(updatedTodos);
  }

  function getEditButton(id) {
    if (id === todoEditing) {
      return <button nClick={() => {submitEdits(id, document.getElementById(id).value)}}>Submit edit</button>;
    }
    return <button onClick={() => {setTodoEditing(id)}}>Edit</button>;
  }

  function getTextEdit(todo) {
    if (todo.id === todoEditing) {
      return <div className="todo-text"><input id={todo.id} type="text" defaultValue={todo.text}></input></div>;
    }
    return <div className="todo-text">{todo.text}<input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/></div>;
  }
  
  // Add the submitEdits code here
  function submitEdits(id, msg) {
      //let updatedTodos = todos.
      let updatedTodos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        todo.completed = false;
        todo.text = msg;
        return todo;
      })
      setTodoEditing(null);
      setTodos(updatedTodos);
  }

  
return(
  <div className ="App">
    <h1>Todo List</h1>
    <form onSubmit={handlesubmit}>
      <input type ="text" align ="right" id= 'todoAdd'/>
      <button type ="submit">Add Todo</button>
    </form>
    {todos.map((todo) => 
    <div className="todo" key={todo.id}>
      {getTextEdit(todo)}
      <br/>
      <div className="button-container">
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        {getEditButton(todo.id)}
      </div>
      </div>
    )}
  </div>
);
};
export default App;
