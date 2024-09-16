import React, { useEffect, useRef, useState } from "react";
import ToDo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  // set Data and stored the local storage
  const [todoList, setToDoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();
  // useRef is directly interacting with the DOM elements

  // Adding the ToDo Items

  const addToDo = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    //   every input fields needs unique so creating another object contains some property and also include the inputText Value also
    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setToDoList(
      (prevValues) => [...prevValues, newToDo],
      (inputRef.current.value = "")
    );
  };

  // Delete ToDo List
  const deleteToDo = (id) => {
    setToDoList((preToDo) => {
      return preToDo.filter((todo) => todo.id !== id);
    });
  };

  // Toggle for change iscomplete state and return todos

  const toggle = (id) => {
    setToDoList((prevToDo) => {
      return prevToDo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  // set item to the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 p-6 max-w-md flex flex-col rounded-xl min-h-[70vh]">
      {/* Title Section */}
      <div className="flex items-center mt-4 gap-2">
        <img className="size-8" src={ToDo_icon} alt="ToDo-Icon" />
        <h1 className="text-2xl font-semibold ">To-Do List</h1>
      </div>

      {/* Input Section */}
      <div className="flex items-center bg-gray-200 my-7 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task..."
        />
        <button
          onClick={addToDo}
          className="border-none bg-orange-600 text-white font-medium text-lg w-[30%] h-14 rounded-full"
        >
          Add +
        </button>
      </div>

      {/* Todo Lists */}
      <div>
        {/* we creating the props to pass the text */}

        {todoList.map((item, index) => {
          return (
            <ToDoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteToDo={deleteToDo}
              toggleToDo={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
