import { TodoList } from './TodoList';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  todoList: TodoList;
}
