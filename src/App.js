import * as React from "react";
import "./App.css";

const apiKeyLocalStorageKey = "apiKey";

function ToDoItem({ id, status, tags, text }) {
  return (
    <div className="App-todo-item">
      <span>Id: {id}</span>
      <span>Status: {status}</span>
      <span>Tags: {tags}</span>
      <span>Text: {text}</span>
    </div>
  );
}

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    const apiKeyFromLocalStorage = localStorage.getItem(apiKeyLocalStorageKey);
    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
      setApiKey(apiKeyFromLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    async function callTodosApi() {
      const response = await fetch("<BACKEND_URL>", {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      return await response.json();
    }
    if (apiKey) {
      callTodosApi()
        .then((res) => {
          setTodos(res.records);
        })
        .catch((e) => console.error(e));
    }
  }, [apiKey]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Api-key">
          <span>Enter API key from email: </span>
          <input
            className="Api-input"
            type="password"
            value={apiKey}
            onChange={(textEvent) => {
              localStorage.setItem(
                apiKeyLocalStorageKey,
                textEvent.target.value
              );
              setApiKey(textEvent.target.value);
            }}
          />
        </div>
        <div className="Todo-list">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <ToDoItem
                status={todo.fields.Status}
                id={todo.id}
                tags={todo.fields.Tags}
                text={todo.fields.Text}
              />
            ))
          ) : (
            <span>No items</span>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
