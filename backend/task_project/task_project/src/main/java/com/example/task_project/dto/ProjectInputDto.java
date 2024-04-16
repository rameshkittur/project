package com.example.task_project.dto;

import lombok.Data;

import java.util.List;
@Data
public class ProjectInputDto {

    private String title;
    private String description;
    private String project_manager_id;
    private String start_date;
    private String status;
    private String end_date;
    private List<Long> tasks_id;
}
