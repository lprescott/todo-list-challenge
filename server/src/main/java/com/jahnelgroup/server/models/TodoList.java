package com.jahnelgroup.server.models;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "todolist")
@Getter
@Setter
@ToString
public class TodoList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "todolist_id")
    private Integer id;

    @NonNull
    @Column(name = "title")
    private String title;

    @NonNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
}
