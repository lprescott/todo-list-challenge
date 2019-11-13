package com.jahnelgroup.todolist.todo.repository;

import com.jahnelgroup.todolist.todo.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoListRepository extends JpaRepository<TodoList, Long> {
}
