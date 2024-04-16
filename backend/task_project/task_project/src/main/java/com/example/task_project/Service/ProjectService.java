package com.example.task_project.Service;

import com.example.task_project.dto.ProjectInputDto;
import com.example.task_project.dto.SimpleProjectDetailResponse;
import com.example.task_project.dto.StatusRequest;
import com.example.task_project.dto.TaskIdRequest;
import com.example.task_project.model.Project;
import com.example.task_project.model.Tasks;

import java.util.List;

public interface ProjectService {
    String addNewProject(ProjectInputDto projectInputDto);

    Project getProject(Long projectId);

    String updateProject(Long id, ProjectInputDto projectInputDto);

    String deleteProject(Long id);

    String addTaskToProject(Long projectId, TaskIdRequest taskIdRequest);

    String deletTaskFromProject(Long projectId, Long taskId);

    String updateStatus(Long projectId, StatusRequest statusRequest);

    List<Tasks> getAllTasks(Long projectId);

    List<Project> getAllProjects();

    List<SimpleProjectDetailResponse> getAllProjectsAssigned(String authorization);

    List<Project> getYourProjects(String authorization);
}
