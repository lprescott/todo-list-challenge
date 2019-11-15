package com.jahnelgroup.todolist.todo.service;

import com.jahnelgroup.todolist.todo.model.Todo;
import com.jahnelgroup.todolist.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    /**
     * deletes all Todos given an ID of their todolist
     *
     * @param id the todolist's id
     */
    public void deleteByListId(Long id) {
        List<Todo> temp = new ArrayList<>();
        temp = findAll();
        for (int i = 0; i < temp.size(); i++) {
            if (temp.get(i).getTodoList().getId() == id) {
                deleteById(temp.get(i).getId());
            }
        }
    }
}
