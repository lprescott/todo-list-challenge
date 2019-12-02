package com.jahnelgroup.server.todo.service;

import com.jahnelgroup.server.todo.model.Todo;
import com.jahnelgroup.server.todo.repository.TodoRepository;
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

    public Optional<Todo> findById(Integer id) {
        return todoRepository.findById(id);
    }

    public Todo save(Todo note) {
        return todoRepository.save(note);
    }

    public void deleteById(Integer id) {
        todoRepository.deleteById(id);
    }

    /**
     * deletes all Todos given an ID of their todolist
     *
     * @param id the todolist's id
     */
    public void deleteByListId(Integer id) {

        System.out.println("deleteByListId called");

        List<Todo> temp;
        temp = findAll();
        for (Todo todo : temp) {
            if (todo.getTodolist().getId().equals(id)) {
                deleteById(todo.getId());
            }
        }
    }
}
