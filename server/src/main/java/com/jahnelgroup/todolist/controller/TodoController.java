package com.jahnelgroup.todolist.controller;

import com.jahnelgroup.todolist.model.Todo;
import com.jahnelgroup.todolist.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> findAll() {
        return ResponseEntity.ok(todoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.save(todo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> findById(@PathVariable Long id) {
        Optional<Todo> stock = todoService.findById(id);
        if (!stock.isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(stock.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @Valid @RequestBody Todo todo) {
        if (!todoService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoService.save(todo));
    }

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
