import "./App.css";
import { useState, useEffect } from "react";
import Todo from "./Components/Todo";
import { v4 as uuidv4 } from "uuid";

const getLocalItems=()=>{
  let list = localStorage.getItem("lists");
  console.log(list)

  if (list){
      return JSON.parse(localStorage.getItem("lists"));
  }
  else{
      return [];
  }
}

function App() {
  // console.log(uuidv4().substring(0, 5));

  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(getLocalItems());
  const [doneTask, setDoneTask] = useState(false);
  const [isEdited, setIsEdited] = useState({ edit: false, todoId: "" });
  console.log(input);

  const addTodo = (event) => {
    const newTodo = {
      id: uuidv4().substring(0, 5),
      text: input,
    };
    event.preventDefault()

    if (input !== "") {
      setTodo([...todo, newTodo]);
    }
    setInput("");
  };
  const deleteTodo = (index) => {
    const updatedTodos = todo.filter((t, i) => i !== index);

    // let tempList = todo;
    // console.log(tempList)
    // tempList.splice(index,1);
    // setTodo([...tempList]);
    setTodo(updatedTodos);
  };
  const editTodo = (index, id) => {
    setInput(todo[index].text);
    setIsEdited({ edit: true, todoId: id });
  };

  const updatedEditedTodo = () => {
    console.log(isEdited.todoId);
    const todoidx = todo.findIndex((e) => e.id === isEdited.todoId);
    const cloneArr = [...todo];
    cloneArr[todoidx] = {
      id: isEdited.todoId,
      text: input,
    };
    setInput("");
    setTodo(cloneArr);
    setIsEdited({ edit: false });
    console.log(todoidx)
    // console.log(updateEditedTodo)
    // setTodo(updateEditedTodo)
    //
  };
  // console.log(todo)
  // console.log(todo.pop())

  useEffect(()=>{
    localStorage.setItem("lists", JSON.stringify(todo))
        }, [todo])

  return (

 <div className="App ">
  <h1 className="text-6xl text-white">Todo App</h1>
        {/* <form action=""> */}
        <form className="mt-10">
          <input
          className=" p-2 outline-none  bg-gray-200 rounded"
            type="text"
            name=""
            id=""
            placeholder="Add task....."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {isEdited.edit ? (
            <button
            className="p-2 bg-yellow-400 rounded mx-2"
              onClick={() => {
                return setIsEdited(!isEdited.edit), updatedEditedTodo();
              }}
              type=""
            >
              Update
            </button>
          ) : (
            <button   className="p-2 bg-green-400 rounded mx-2 text-white" onClick={addTodo} type="">
              ADD
            </button>
          )}
        </form>
        {/* </form> */}
        <div>
          {todo.map((todo, index) => {
            return (
              <div key={index} className="w-full mt-10">
                {doneTask ? (
                  <strike className="p-2 m-2 text-2xl w-96 ">{todo.text}</strike>
                ) : (
                  <span className="p-2 m-2 text-2xl w-96">{todo.text}</span>
                )}
                <button className="p-2 bg-blue-500 rounded mx-2 text-white" onClick={() => editTodo(index, todo.id)}>Edit</button>
                <button className="p-2 bg-red-400 rounded mx-2 text-white" onClick={() => deleteTodo(index)}>Delete</button>
                {doneTask ? (
                  <button className="p-2 bg-pink-400 rounded mx-2 text-white"  onClick={() => setDoneTask(false)}>Undone</button>
                ) : (
                  <button className="p-2 bg-pink-400 rounded mx-2 text-white"  onClick={() => setDoneTask(true)}>Done</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default App;
