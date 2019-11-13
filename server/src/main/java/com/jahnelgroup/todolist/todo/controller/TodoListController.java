package com.jahnelgroup.todolist.todo.controller;

import com.jahnelgroup.todolist.todo.model.TodoList;
import com.jahnelgroup.todolist.todo.service.TodoListService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/lists")
@Slf4j
@RequiredArgsConstructor
public class TodoListController {

    @NonNull
    private TodoListService todoListService;

    @GetMapping
    public ResponseEntity<List<TodoList>> findAll() {
        return ResponseEntity.ok(todoListService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody TodoList todoList) {
        return ResponseEntity.ok(todoListService.save(todoList));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoList> findById(@PathVariable Long id) {
        Optional<TodoList> todoList = todoListService.findById(id);
        if (!todoList.isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoList.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoList> update(@PathVariable Long id, @Valid @RequestBody TodoList todoList) {
        if (!todoListService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoListService.save(todoList));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!todoListService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        todoListService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
