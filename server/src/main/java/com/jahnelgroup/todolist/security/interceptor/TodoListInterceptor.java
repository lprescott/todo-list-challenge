package com.jahnelgroup.todolist.security.interceptor;

import com.jahnelgroup.todolist.security.JsonWebToken;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TodoListInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle (HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // Secure any rest api calls except those that are a user attempting to authorize
        if (!request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString().startsWith("/auth/")) {
            try{
                Claims claims = JsonWebToken.decodeJWT(WebUtils.getCookie(request, "jwt").getValue());
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
}
