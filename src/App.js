import * as React from "react";
import "./App.css";

const apiKeyLocalStorageKey = "apiKey";

function ToDoItem({ id, status, tags, text }) {
  return (
    <>
      <ul className="App-todo-item">
        <li>Id: {id}</li>
        <li>Status: {status}</li>
        <li>Tags: {tags}</li>
        <li>Text: {text}</li>
      </ul>
    </>
  );
}

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  React.useEffect(()=>{
    const apiKeyFromLocalStorage = localStorage.getItem(
      apiKeyLocalStorageKey
    );
    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
      setApiKey(apiKeyFromLocalStorage);
    }
  }, [])

  React.useEffect(() => {
    async function callTodosApi() {
      const response = await fetch("<BACKEND URL>", {
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
        <p>
          <span style={{ padding: "10px" }}>Enter API key from email:</span>
          <input
            className="App-input"
            type="text"
            value={apiKey}
            onChange={(textEvent) => {
              localStorage.setItem(
                apiKeyLocalStorageKey,
                textEvent.target.value
              );
              setApiKey(textEvent.target.value);
            }}
          />
        </p>
        {todos.map((todo) => (
          <ToDoItem
            status={todo.fields.Status}
            id={todo.id}
            tags={todo.fields.Tags}
            text={todo.fields.Text}
          />
        ))}
      </header>
    </div>
  );
}

export default App;
