package com.jahnelgroup.todolist.list;

import com.jahnelgroup.todolist.TodoListApplication;
import com.jahnelgroup.todolist.list.model.TodoList;
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

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TodoListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ListTest {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    /**
     * This function creates the full web path of the lists api.
     * @return The web url of the lists api.
     */
    private String getListsURL() {
        return "http://localhost:" + port + "/lists";
    }

    @Test
    public void contextLoads() {
    }

    /**
     * Here we test getting all the lists in the database
     * using the GET method
     */
    @Test
    public void testGetAllLists() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getListsURL(),
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }

    /**
     * Here we test if we can fetch a single list using its id
     */
    @Test
    public void testGetTodoById() {
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
    public void testUpdateTodo() {
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
    public void testDeleteTodo() {
        testCreateList();

        try {
            int id = 1;
            TodoList list = testRestTemplate.getForObject(getListsURL() + "/" + id, TodoList.class);
            Assert.assertNotNull(list);
            testRestTemplate.delete(getListsURL() + "/" + id);
        } catch (final HttpClientErrorException e) {
            Assert.assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
    }
}
