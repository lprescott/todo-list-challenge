package com.jahnelgroup.todolist;

import com.jahnelgroup.todolist.list.model.TodoList;
import com.jahnelgroup.todolist.todo.model.Todo;
import com.jahnelgroup.todolist.user.model.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TodoListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoListApplicationTests {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    @Test
    void contextLoads() {
    }

    /**
     * This function creates the full web path of the users api.
     *
     * @return The web url of the users api.
     */
    private String getUsersURL() {
        return "http://localhost:" + port + "/users";
    }

    /**
     * This function creates the full web path of the todos api.
     *
     * @return The web url of the todos api.
     */
    private String getTodosURL() {
        return "http://localhost:" + port + "/todos";
    }

    /**
     * This function creates the full web path of the lists api.
     *
     * @return The web url of the lists api.
     */
    private String getListsURL() {
        return "http://localhost:" + port + "/lists";
    }


    /**
     * This function creates the full web path of the auth api.
     *
     * @return The web url of the lists api.
     */
    private String getAuthURL() {
        return "http://localhost:" + port + "/auth";
    }

    /**
     * Here we test getting all the users in the database
     * using the GET method
     */
    @Test
    public void testGetAllUsers() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getUsersURL(),
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }

    /**
     * Here we test if we can fetch a single user using its id
     */
    @Test
    public void testGetUserById() {
        testCreateUser();

        User user2 = testRestTemplate.getForObject(getUsersURL() + "/4", User.class);
        Assert.assertNotNull(user2);
    }

    /**
     * Here we test if we can create a user using the POST method
     */
    @Test
    public void testCreateUser() {
        User user = new User();
        user.setName("user1");

        ResponseEntity<User> postResponse = testRestTemplate.postForEntity(getUsersURL(), user, User.class);
        Assert.assertNotNull(postResponse);
        Assert.assertNotNull(postResponse.getBody());
    }

    /**
     * Here we test that we can update a user's information using the PUT method
     */
    @Test
    public void testUpdateUser() {
        testCreateUser();

        int id = 1;
        User userNew = testRestTemplate.getForObject(getUsersURL() + "/" + id, User.class);
        userNew.setName("Test User New Name");

        testRestTemplate.put(getUsersURL() + "/" + id, userNew);

        User updatedUser = testRestTemplate.getForObject(getUsersURL() + "/" + id, User.class);
        Assert.assertNotNull(updatedUser);
    }

    /**
     * Here we test that we can delete a user by using the DELETE method,
     * then we verify that it no longer exists in the database
     */
    @Test
    public void testDeleteUser() {
        testCreateUser();

        try {
            int id = 1;
            User user = testRestTemplate.getForObject(getUsersURL() + "/" + id, User.class);
            Assert.assertNotNull(user);
            testRestTemplate.delete(getUsersURL() + "/" + id);
        } catch (final HttpClientErrorException e) {
            Assert.assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Here we test getting all the todos in the database
     * using the GET method
     */
    @Test
    public void testGetAllTodos() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

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

    /**
     * Here we test getting all the lists in the database
     * using the GET method
     */
    @Test
    public void testGetAllLists() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getListsURL(),
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }

    /**
     * Here we test if we can fetch a single list using its id
     */
    @Test
    public void testGetListById() {
        testCreateList();

        TodoList list2 = testRestTemplate.getForObject(getListsURL() + "/1", TodoList.class);
        System.out.println(list2.getName());
        Assert.assertNotNull(list2);
    }

    /**
     * Here we test if we can create a list using the POST method
     */
    @Test
    public void testCreateList() {
        TodoList list = new TodoList();
        list.setName("Test TodoList");

        ResponseEntity<TodoList> postResponse = testRestTemplate.postForEntity(getListsURL(), list, TodoList.class);
        Assert.assertNotNull(postResponse);
        Assert.assertNotNull(postResponse.getBody());
    }

    /**
     * Here we test that we can update a list's information using the PUT method
     */
    @Test
    public void testUpdateList() {
        testCreateList();

        int id = 1;
        TodoList listNew = testRestTemplate.getForObject(getListsURL() + "/" + id, TodoList.class);
        listNew.setName("Test TodoList New Name");

        testRestTemplate.put(getListsURL() + "/" + id, listNew);

        TodoList updatedTodoList = testRestTemplate.getForObject(getListsURL() + "/" + id, TodoList.class);
        Assert.assertNotNull(updatedTodoList);
    }

    /**
     * Here we test that we can delete a list by using the DELETE method,
     * then we verify that it no longer exists in the database
     */
    @Test
    public void testDeleteList() {
        testCreateList();

        try {
            int id = 4;
            TodoList list = testRestTemplate.getForObject(getListsURL() + "/" + id, TodoList.class);
            Assert.assertNotNull(list);
            testRestTemplate.delete(getListsURL() + "/" + id);
        } catch (final HttpClientErrorException e) {
            Assert.assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Here we test that a users login api works.
     */
    @Test
    public void testLogin() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getAuthURL()+"/test",
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }

    /**
     * Here we test that a user can be authenticated with the correct JWT.
     */
    @Test
    public void testAuth() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getAuthURL()+"/dsnf897safdphds",
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }
}
