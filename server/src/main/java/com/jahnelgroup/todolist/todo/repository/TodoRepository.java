package com.jahnelgroup.todolist.todo.repository;

import com.jahnelgroup.todolist.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
