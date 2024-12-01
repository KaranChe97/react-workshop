import { todoT } from "./container/todo-with-state";

const getItems = (key: string) => {
  const content = localStorage.getItem(key);
  if (content) {
    return JSON.parse(content);
  } else {
    return [];
  }
};


const setItems = (key: string, item: todoT[]) => {
  localStorage.setItem(key, JSON.stringify(item));
};


const clearStorage = (key: string) => {
  localStorage.setItem(key, '');
};

export { getItems, setItems, clearStorage };
