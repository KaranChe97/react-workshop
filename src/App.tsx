import "./App.css";
import "./index.css";
// import TodoWithState from './container/todo-with-state';
// import TodoWithStorage from './container/todo-with-storage';
import TodoWithApi from "./container/todo-with-api";

function App() {
  return (
    <>
      {/* <TodoWithState /> */}
      {/* <TodoWithStorage /> */}
      <TodoWithApi />
    </>
  );
}

export default App;
