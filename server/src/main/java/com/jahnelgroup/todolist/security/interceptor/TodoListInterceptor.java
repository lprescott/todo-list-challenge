package com.jahnelgroup.todolist.security.interceptor;

import com.jahnelgroup.todolist.security.JsonWebToken;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class TodoListInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        // Secure any rest api calls except those that are a user attempting to authorize
        if (!request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString().startsWith("/auth/")) {
            try {
                JsonWebToken.decodeJWT(Objects.requireNonNull(WebUtils.getCookie(request, "jwt")).getValue());
                return true;
            } catch (Exception e) {
                response.sendRedirect("");
                return false;
            }
        }
        return true;
    }
}
