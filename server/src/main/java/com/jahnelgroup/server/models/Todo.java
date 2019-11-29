package com.jahnelgroup.server.models;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "todo")
@Getter
@Setter
@ToString
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "todo_id")
    private Integer id;

    @NonNull
    @Column(name = "text")
    private String text;

    @NonNull
    @Column(name = "completed")
    private Boolean completed;

    @NonNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "todolist_id")
    private TodoList todolist;
}
