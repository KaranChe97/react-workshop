import React, { useState, useEffect } from "react";

export type todoT = {
  id: number;
  completed: boolean;
  task: string;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function TodoWithApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [todos, setTodos] = useState<todoT[]>([]);

  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = async () => {
    if (!newTodo.trim()) {
      alert("Todo cannot be empty!");
      return;
    }
    setIsAdding(true);
    fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsAdding(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };

  const markAsComplete = async (id: number, completed: boolean) => {
    const payload = JSON.stringify({ completed });
    fetch(`${baseUrl}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === data.id) {
              return data;
            }
            return todo;
          })
        );
      })
      .catch((err) => {
        console.log({ err });
        setError(err.message);
      });
  };

  const clearList = async () => {};

  const getTodos = async () => {
    setLoading(true);
    fetch(`${baseUrl}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex flex-col items-center">
      <h1 className="text-slate-800 text-4xl font-bold mb-12  tracking-wider">
        To-do List
      </h1>

      {loading ? (
        <h1 className="text-slate-800 text-4xl font-bold mb-12 uppercase tracking-wider">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="text-red-500 text-4xl font-bold mb-12 uppercase tracking-wider">
          {error}
        </h1>
      ) : (
        <ol className="list-none p-0 w-full max-w-3xl">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="cursor-pointer flex justify-between items-center gap-4 bg-white p-5 rounded-xl mb-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className="inline-flex gap-4 justify-start flex-grow items-center"
                onClick={() => markAsComplete(todo.id, !todo.completed)}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="w-6 h-6 accent-indigo-600"
                />
                <p
                  className={`m-0 text-slate-700 text-lg font-medium ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.task}
                </p>
              </div>
              <button
                className="text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      )}

      {isAdding && (
        <h1 className="text-slate-800 text-4xl font-bold mb-12 uppercase tracking-wider">
          Adding...
        </h1>
      )}

      <form
        onSubmit={handleSubmit}
        onReset={clearList}
        className="w-full max-w-3xl mt-12"
      >
        <div className="flex gap-4 w-full">
          <input
            type="text"
            value={newTodo}
            placeholder="Enter Todo"
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-4 rounded-xl border-2 border-slate-200 text-lg outline-none focus:border-indigo-600 transition-colors duration-200"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-indigo-600 text-white cursor-pointer text-lg font-semibold hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            Add
          </button>
          <button
            type="reset"
            className="px-8 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 cursor-pointer text-lg font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(TodoWithApi);
