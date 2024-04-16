package com.example.task_project.model;

import com.example.task_project.utility.Status;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tasks {
    @Id
    @Column(name = "task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    private Long projectId;
    @Column(nullable = false)
    private String taskName;
    @Column(nullable = false,length=1500)
    private  String description;
    @Column(name = "assignedTo")
    private String assignedTo;
    @Column(nullable = false)
    private String assignedBy;
    @Column(nullable = false)
    private String due_date;
    private Status status;
    private String completed_on;
}
