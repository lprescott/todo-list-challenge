package com.jahnelgroup.server.todolist.controller;

import com.jahnelgroup.server.todo.service.TodoService;
import com.jahnelgroup.server.todolist.service.TodoListService;
import com.jahnelgroup.server.todolist.model.TodoList;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private TodoListService todoListService;

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoList>> findAll() {
        return ResponseEntity.ok(todoListService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody TodoList todoList) {
        return ResponseEntity.ok(todoListService.save(todoList));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoList> findById(@PathVariable Integer id) {
        Optional<TodoList> todoList = todoListService.findById(id);
        if (todoList.isEmpty()) {
            log.error("Id " + id + " does not exist");
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(todoList.get());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoList> update(@PathVariable Integer id, @Valid @RequestBody TodoList todoList) {
        if (todoListService.findById(id).isEmpty()) {
            log.error("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(todoListService.save(todoList));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        if (todoListService.findById(id).isEmpty()) {
            log.error("Id " + id + " does not exist");
            ResponseEntity.badRequest().build();
        }

        try {
            todoService.deleteByListId(id);
        } catch (Throwable throwable) {
            System.out.println("Error deleting Todos by list id, perhaps you are running tests?");
        }

        todoListService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
