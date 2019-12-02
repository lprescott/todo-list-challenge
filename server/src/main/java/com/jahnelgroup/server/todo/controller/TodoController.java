package com.jahnelgroup.server.todo.controller;

import com.jahnelgroup.server.todo.model.Todo;
import com.jahnelgroup.server.todo.service.TodoService;
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

    @GetMapping
    public ResponseEntity<List<Todo>> findAll() {
        return ResponseEntity.ok(todoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.save(todo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> findById(@PathVariable Integer id) {
        Optional<Todo> todo = todoService.findById(id);
        if (todo.isEmpty()) {
            log.error("Id " + id + " is not existed");
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(todo.get());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Integer id, @Valid @RequestBody Todo todo) {
        if (todoService.findById(id).isEmpty()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoService.save(todo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        if (todoService.findById(id).isEmpty()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        todoService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
