import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

// we destructuring the props from the parent that why using {text}(text contains the value like "First "."second")
const ToDoItems = ({ text, id, isComplete, deleteToDo, toggleToDo }) => {
  return (
    <div className="flex items-center my-4 gap-2">
      <div
        onClick={() => {
          toggleToDo(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt="Tick-Icon"
          className="size-7"
        />
        <p
          className={`text-slate-700 text-base ml-3 ${
            isComplete ? "line-through" : ""
          } decoration-slate-500`}
        >
          {text}
        </p>
      </div>
      <img
        src={delete_icon}
        alt="Delete-Icon"
        className="size-4 cursor-pointer"
        onClick={() => deleteToDo(id)}
      />
    </div>
  );
};

export default ToDoItems;
