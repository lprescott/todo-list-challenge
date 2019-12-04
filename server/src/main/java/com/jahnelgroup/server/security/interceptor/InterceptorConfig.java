package com.jahnelgroup.server.security.interceptor;

import com.jahnelgroup.server.user.model.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class InterceptorConfig implements WebMvcConfigurer {

    private TodoListInterceptor todoListInterceptor;

    @Autowired
    public InterceptorConfig(TodoListInterceptor todoListInterceptor) {
        this.todoListInterceptor = todoListInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(todoListInterceptor);
    }
}
