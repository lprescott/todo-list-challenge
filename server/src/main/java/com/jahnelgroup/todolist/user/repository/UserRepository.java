package com.jahnelgroup.todolist.user.repository;

import com.jahnelgroup.todolist.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
