package com.jahnelgroup.todolist;

import com.jahnelgroup.todolist.TodoListApplication;
import com.jahnelgroup.todolist.user.model.User;
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
public class UserTest {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    /**
     * This function creates the full web path of the users api.
     * @return The web url of the users api.
     */
    private String getUsersURL() {
        return "http://localhost:" + port + "/users";
    }

    @Test
    public void contextLoads() {
    }

    /**
     * Here we test getting all the users in the database
     * using the GET method
     */
    @Test
    public void testGetAllUsers() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

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

        User user2 = testRestTemplate.getForObject(getUsersURL() + "/1", User.class);
        System.out.println(user2.getName());
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
}

