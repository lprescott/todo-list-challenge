package com.jahnelgroup.todolist.todo.service;

import com.jahnelgroup.todolist.todo.model.Todo;
import com.jahnelgroup.todolist.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo save(Todo note) {
        return todoRepository.save(note);
    }

    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }
}
