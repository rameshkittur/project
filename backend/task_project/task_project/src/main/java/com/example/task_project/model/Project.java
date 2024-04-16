package com.example.task_project.model;

import com.example.task_project.utility.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;
    @Column(nullable = false,unique = true)
    private String title;
    @Column(nullable = false,length=1500)
    private String description;
    @Column(nullable = false,name="projectManagerId")
    private String projectManagerId;
    @Column(nullable = false)
    private String start_date;
    private Status status;
    private String end_date;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Tasks>tasks;

}
