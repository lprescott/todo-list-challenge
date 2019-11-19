package com.jahnelgroup.todolist.security.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class TodoListInterceptorConfig implements WebMvcConfigurer {

    private TodoListInterceptor todoListInterceptor;

    @Autowired
    public TodoListInterceptorConfig(TodoListInterceptor todoListInterceptor) {
        this.todoListInterceptor = todoListInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(todoListInterceptor);
    }
}
