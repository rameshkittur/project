package com.example.task_project.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String taskName;
    private  String description;
    private Long projectId;
    private String assigned_to;
    private String assigned_by;
    private String due_date;
    private String status;
    private String completed_on;
}
