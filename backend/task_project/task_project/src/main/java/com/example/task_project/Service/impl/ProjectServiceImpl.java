package com.example.task_project.Service.impl;

import com.example.task_project.Service.JWTService;
import com.example.task_project.Service.ProjectService;
import com.example.task_project.dto.ProjectInputDto;
import com.example.task_project.dto.SimpleProjectDetailResponse;
import com.example.task_project.dto.StatusRequest;
import com.example.task_project.dto.TaskIdRequest;
import com.example.task_project.model.Project;
import com.example.task_project.utility.Status;
import com.example.task_project.model.Tasks;
import com.example.task_project.repository.ProjectRepository;
import com.example.task_project.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
        @Autowired
        private TaskRepository taskRepository;
        @Autowired
        private ProjectRepository projectRepository;
        @Autowired
        private JWTService jwtService;
    public String addNewProject(ProjectInputDto projectInputDto) {
        Project project=projectRequestToProject(projectInputDto);
        projectRepository.save(project);
        return "New Project is created";
    }

    public Project getProject(Long projectId) {
       return projectRepository.findById(projectId).get();
    }

    public String updateProject(Long id, ProjectInputDto projectInputDto) {
      Project project=projectRepository.findById(id).get();
        project.setProjectManagerId(projectInputDto.getProject_manager_id());
        project.setTitle(projectInputDto.getTitle());
        project.setDescription(projectInputDto.getDescription());
        project.setStart_date(projectInputDto.getStart_date());
        project.setEnd_date(projectInputDto.getEnd_date());
        project.setStatus(Status.valueOf(projectInputDto.getStatus()));

        List<Tasks>allTasks=new ArrayList<>();
        List<Long>taskIds=projectInputDto.getTasks_id();
        for(Long taskId:taskIds){
            Tasks task=taskRepository.findById(taskId).get();
            allTasks.add(task);
        }
        project.setTasks(allTasks);
      projectRepository.save(project);
      return "project is updated";

    }

    public String deleteProject(Long id) {
        projectRepository.deleteById(id);
        return "project is deleted";
    }

    public String addTaskToProject(Long projectId, TaskIdRequest taskIdRequest) {
        Project project=projectRepository.findById(projectId).get();
        List<Tasks>tasks=project.getTasks();

        for(Long id:taskIdRequest.getTaskId()){
            tasks.add(taskRepository.findById(id).get());
        }
        project.setTasks(tasks);
        projectRepository.save(project);
        return "Tasks are added to your project";
    }

    public String deletTaskFromProject(Long projectId, Long taskId) {
        Project project=projectRepository.findById(projectId).get();
        List<Tasks>tasksInProject=project.getTasks();
        List<Tasks>finalTasks=new ArrayList<>();

        for(Tasks tasks:tasksInProject){
            if(tasks.getTaskId()!=taskId)
                finalTasks.add(tasks);
        }
        project.setTasks(finalTasks);
        projectRepository.save(project);
        taskRepository.deleteById(taskId);
        return "task is deleted from project";
    }

    public String updateStatus(Long projectId, StatusRequest statusRequest) {
        Project project=projectRepository.findById(projectId).get();
        project.setStatus(Status.valueOf(statusRequest.getStatus()));
        projectRepository.save(project);
        return "project status is updated";
    }

    public List<Tasks> getAllTasks(Long projectId) {
        Project project=projectRepository.findById(projectId).get();
        return project.getTasks();
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<SimpleProjectDetailResponse> getAllProjectsAssigned(String authorization) {
        String token = authorization.substring("Bearer ".length());
        String email=jwtService.extractUserName(token);
        List<Project>allProjects=projectRepository.findByProjectManagerId(email);
        List<SimpleProjectDetailResponse>response=new ArrayList<>();
        for(Project project:allProjects){
            SimpleProjectDetailResponse projectDetailResponse=new SimpleProjectDetailResponse();
            projectDetailResponse.setId(project.getProjectId());
            projectDetailResponse.setTitle(project.getTitle());
            response.add(projectDetailResponse);
        }
        return response;
    }

    public List<Project> getYourProjects(String authorization) {
        String token = authorization.substring("Bearer ".length());
        String email=jwtService.extractUserName(token);
        return projectRepository.findByProjectManagerId(email);
    }

    public Project projectRequestToProject(ProjectInputDto projectInputDto){
        Project project=new Project();
        project.setProjectManagerId(projectInputDto.getProject_manager_id());
        project.setTitle(projectInputDto.getTitle());
        project.setDescription(projectInputDto.getDescription());
        project.setStart_date(projectInputDto.getStart_date());
        project.setEnd_date(projectInputDto.getEnd_date());
        project.setStatus(Status.valueOf(projectInputDto.getStatus()));

        List<Tasks>allTasks=new ArrayList<>();
        List<Long>taskId=projectInputDto.getTasks_id();
        for(Long id:taskId){
            Tasks task=taskRepository.findById(id).get();
            allTasks.add(task);
        }
        project.setTasks(allTasks);

        return project;

    }

}
