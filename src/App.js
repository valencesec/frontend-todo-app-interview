import * as React from "react";
import "./App.css";

import { getAllTodos, deleteItem, addItem, updateItem } from "./api";

const apiKeyLocalStorageKey = "apiKey";

const getNewStatus = (status) => {
  return status === "Todo" ? "Done" : "Todo";
};

function ToDoItem({ id, status, tags, text, apiKey, updated, setUpdated }) {
  const isDone = status === "Done";
  return (
    <div className="App-todo-item">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => {
          updateItem(apiKey, id, getNewStatus(status));
          setUpdated(updated + 1);
        }}
      />
      <span>Id: {id}</span>
      <span>Status: {status}</span>
      <span>Tags: {tags}</span>
      <span>Text: {text}</span>
      <button
        onClick={() => {
          deleteItem(apiKey, id);
          setUpdated(updated + 1);
        }}
      >
        X
      </button>
    </div>
  );
}

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [updated, setUpdated] = React.useState(0);

  React.useEffect(() => {
    const apiKeyFromLocalStorage =
      localStorage.getItem(apiKeyLocalStorageKey) ||
      "Zamiw7wWFU2ADFAylHmwK1AZP7LPhRRP3inB2BqL";

    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);

      setApiKey(apiKeyFromLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    if (apiKey) {
      getAllTodos(apiKey)
        .then((res) => {
          console.log(res.records);
          setTodos(res.records);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [apiKey, updated]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Todo-list">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <ToDoItem
                status={todo.fields.Status}
                id={todo.id}
                tags={todo.fields.Tags}
                text={todo.fields.Text}
                apiKey={apiKey}
                updated={updated}
                setUpdated={setUpdated}
              />
            ))
          ) : (
            <span>No items</span>
          )}
          <button
            onClick={() => {
              addItem(apiKey);
              setUpdated(updated + 1);
            }}
          >
            Add New
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
