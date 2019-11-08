package com.jahnelgroup.todolist;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TodoListApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoListApplicationTests {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    /**
     * This function creates the full web path of the todos api.
     * @return The web url of the todos api.
     */
    private String getRootUrl() {
        return "http://localhost:" + port + "/todos";
    }

    @Test
    void contextLoads() {
    }

    /**
     * Here we test getting all the todos in the database
     * using the GET method
     */
    @Test
    public void testGetAllTodos() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<String> response = testRestTemplate.exchange(getRootUrl(),
                HttpMethod.GET, entity, String.class);

        Assert.assertNotNull(response.getBody());
    }
}
