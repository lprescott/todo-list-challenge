package com.jahnelgroup.server.todolist.repository;

import com.jahnelgroup.server.todolist.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Integer> {
}
