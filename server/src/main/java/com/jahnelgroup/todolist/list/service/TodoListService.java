package com.jahnelgroup.todolist.list.service;

import com.jahnelgroup.todolist.list.model.TodoList;
import com.jahnelgroup.todolist.list.repository.TodoListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoListService {

    private TodoListRepository todoListRepository;

    @Autowired
    public TodoListService(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    public List<TodoList> findAll() {
        return todoListRepository.findAll();
    }

    public Optional<TodoList> findById(Long id) {
        return todoListRepository.findById(id);
    }

    public TodoList save(TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    public void deleteById(Long id) {
        todoListRepository.deleteById(id);
    }
}
