package com.jahnelgroup.server.security.interceptor;

import com.jahnelgroup.server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TodoListInterceptor implements HandlerInterceptor {

    private JwtUtil jwtUtil;

    @Autowired
    public TodoListInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String path = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();

        System.out.println(path);

        // Secure any rest api calls except those that are a user attempting to login
        if (path.startsWith("/users") || path.startsWith("/todos")
                || path.startsWith("/lists")) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (jwtUtil.validateToken(WebUtils.getCookie(request, "jwt").getValue(), userDetails)) return true;
            else return false;
        }

        return true;
    }
}
