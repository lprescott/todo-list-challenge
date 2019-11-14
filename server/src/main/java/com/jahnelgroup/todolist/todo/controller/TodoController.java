package com.jahnelgroup.todolist.todo.controller;

import com.jahnelgroup.todolist.todo.service.TodoService;
import com.jahnelgroup.todolist.todo.model.Todo;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/todos")
@Slf4j
@RequiredArgsConstructor
public class TodoController {

    @NonNull
    private TodoService todoService;

    /**
     * returns all todos
     * @return a list of all todos in JSON, and http header
     */
    @GetMapping
    public ResponseEntity<List<Todo>> findAll() {
        return ResponseEntity.ok(todoService.findAll());
    }

    /**
     * adds a todo
     * @param todo the todo to add
     * @return the todo added, and http header
     */
    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.save(todo));
    }

    /**
     * gets a todo by id
     * @param id the id of the todo
     * @return the todo to get, and http header
     */
    @GetMapping("/{id}")
    public ResponseEntity<Todo> findById(@PathVariable Long id) {
        Optional<Todo> todo = todoService.findById(id);
        if (!todo.isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todo.get());
    }

    /**
     * updates a todo by id
     * @param id the id of the todo to update
     * @param todo the content of the updated todo
     * @return the updated todo, and http header
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @Valid @RequestBody Todo todo) {
        if (!todoService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoService.save(todo));
    }

    /**
     * delete a todo by id
     * @param id the id of the todo to delete
     * @return http header
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!todoService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        todoService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
