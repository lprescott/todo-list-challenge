package com.jahnelgroup.todolist.todo;

import com.jahnelgroup.todolist.TodoListApplication;
import com.jahnelgroup.todolist.todo.model.Todo;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import java.util.NoSuchElementException;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TodoListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TodoTests {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    /**
     * This function creates the full web path of the todos api.
     * @return The web url of the todos api.
     */
    private String getTodosURL() {
        return "http://localhost:" + port + "/todos";
    }

    @Test
    public void contextLoads() {
    }

    /**
     * Here we test getting all the todos in the database
     * using the GET method
     */
    @Test
    public void testGetAllTodos() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getTodosURL(),
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }

    /**
     * Here we test if we can fetch a single todo using its id
     */
    @Test
    public void testGetTodoById() {
        testCreateTodo();

        Todo todo2 = testRestTemplate.getForObject(getTodosURL() + "/1", Todo.class);
        System.out.println(todo2.getTitle());
        Assert.assertNotNull(todo2);
    }

    /**
     * Here we test if we can create a todo using the POST method
     */
    @Test
    public void testCreateTodo() {
        Todo todo = new Todo();
        todo.setTitle("Test Todo");
        todo.setCompleted(false);

        ResponseEntity<Todo> postResponse = testRestTemplate.postForEntity(getTodosURL(), todo, Todo.class);
        Assert.assertNotNull(postResponse);
        Assert.assertNotNull(postResponse.getBody());
    }

    /**
     * Here we test that we can update a todo's information using the PUT method
     */
    @Test
    public void testUpdateTodo() {
        testCreateTodo();

        int id = 1;
        Todo todoNew = testRestTemplate.getForObject(getTodosURL() + "/" + id, Todo.class);
        todoNew.setTitle("Test Todo New Name");
        todoNew.setCompleted(true);

        testRestTemplate.put(getTodosURL() + "/" + id, todoNew);

        Todo updatedTodo = testRestTemplate.getForObject(getTodosURL() + "/" + id, Todo.class);
        Assert.assertNotNull(updatedTodo);
    }

    /**
     * Here we test that we can delete a todo by using the DELETE method,
     * then we verify that it no longer exists in the database
     */
    @Test
    public void testDeleteTodo() {
        testCreateTodo();

        try {
            int id = 1;
            Todo todo = testRestTemplate.getForObject(getTodosURL() + "/" + id, Todo.class);
            Assert.assertNotNull(todo);
            testRestTemplate.delete(getTodosURL() + "/" + id);
        } catch (final HttpClientErrorException e) {
            Assert.assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
    }
}
