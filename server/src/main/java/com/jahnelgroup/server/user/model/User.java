package com.jahnelgroup.server.user.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Getter
@Setter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @NonNull
    @Column(name = "username")
    private String username;

    @NonNull
    @Column(name = "password")
    private String password;

    @Column(name = "active")
    private Boolean active;

    @NonNull
    @Column(name = "roles")
    private String roles;
}
