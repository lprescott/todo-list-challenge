package com.jahnelgroup.todolist.controller;

import com.jahnelgroup.todolist.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
