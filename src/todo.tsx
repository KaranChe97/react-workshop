export type todoT = {
  completed: boolean;
  task: string;
};

function TodoWithState() {
  const todos: todoT[] = [
    {
      completed: false,
      task: "Getting started",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex flex-col items-center">
      <h1 className="text-slate-800 text-4xl font-bold mb-12 uppercase tracking-wider">
        Todos
      </h1>

      <ol className="list-none p-0 w-full max-w-3xl">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="cursor-pointer flex items-center gap-4 bg-white p-5 rounded-xl mb-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <p
              className={`m-0 text-slate-700 text-lg font-medium ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.task}
            </p>
          </li>
        ))}
      </ol>

      <form className="w-full max-w-3xl mt-12">
        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Todo"
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

export default TodoWithState;
