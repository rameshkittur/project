package com.example.task_project.Service;

import com.example.task_project.dto.StatusRequest;
import com.example.task_project.dto.TaskRequest;
import com.example.task_project.dto.TaskResponse;
import com.example.task_project.model.Tasks;

import java.util.List;

public interface TaskService {
    String addNewTask(TaskRequest taskRequest);

    TaskResponse getTask(Long taskId);

    String updateStatus(Long taskId, StatusRequest statusRequest);

    String updateTask(Long taskId, TaskRequest taskRequest);

    List<Tasks> getAllTasks(String authorizationHeader);

    List<Tasks> getProjectTasksYouCreated(Long id, String authHeader);

//    String deleteTask(Long id);
}
