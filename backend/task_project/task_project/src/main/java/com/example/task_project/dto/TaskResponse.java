package com.example.task_project.dto;

import com.example.task_project.utility.Status;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class TaskResponse {
    private String taskName;
    private  String description;
    private Long projectId;
    private String assigned_to;
    private String assigned_by;
    private String due_date;
    private Status status;
    private String completed_on;
}
