package com.jahnelgroup.todolist.list.repository;

import com.jahnelgroup.todolist.list.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoListRepository extends JpaRepository<TodoList, Long> {
}
