package com.example.task_project.Service.impl;

import com.example.task_project.Service.JWTService;
import com.example.task_project.Service.TaskService;
import com.example.task_project.dto.StatusRequest;
import com.example.task_project.dto.TaskRequest;
import com.example.task_project.dto.TaskResponse;
import com.example.task_project.model.Project;
import com.example.task_project.repository.ProjectRepository;
import com.example.task_project.utility.Status;
import com.example.task_project.model.Tasks;
import com.example.task_project.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private JWTService jwtService;
    public String addNewTask(TaskRequest taskRequest) {
        Tasks tasks=new Tasks();
        tasks.setTaskName(taskRequest.getTaskName());
        tasks.setDescription(taskRequest.getDescription());
        tasks.setStatus(Status.valueOf(taskRequest.getStatus()));
        tasks.setAssignedTo(taskRequest.getAssigned_to());
        tasks.setAssignedBy(taskRequest.getAssigned_by());
        tasks.setDue_date(taskRequest.getDue_date());
        Long projectId= tasks.getProjectId();
        tasks.setProjectId(projectId);
        tasks.setCompleted_on(taskRequest.getCompleted_on());

        Long project_id=taskRequest.getProjectId();
        tasks.setProjectId(project_id);
        Optional<Project>opt=projectRepository.findById(project_id);
        if(opt.isPresent()){
            Project project=opt.get();
            List<Tasks>tasksList=project.getTasks();
            tasksList.add(tasks);
            projectRepository.save(project);
        }

        taskRepository.save(tasks);
        return "New task is created";
    }

    public TaskResponse getTask(Long taskId) {
        Tasks tasks=taskRepository.findById(taskId).get();
        TaskResponse taskResponse=new TaskResponse();
        taskResponse.setTaskName(tasks.getTaskName());
        taskResponse.setDescription(tasks.getDescription());
        taskResponse.setAssigned_to(tasks.getAssignedTo());
        taskResponse.setAssigned_by(tasks.getAssignedBy());
        taskResponse.setDue_date(tasks.getDue_date());
        taskResponse.setCompleted_on(tasks.getCompleted_on());
        taskResponse.setProjectId(tasks.getProjectId());
        taskResponse.setStatus(tasks.getStatus());

        return taskResponse;
    }

    public String updateStatus(Long taskId, StatusRequest statusRequest) {

        Tasks task=taskRepository.findById(taskId).get();
        String status=statusRequest.getStatus();
        System.out.println("status is"+status);
        if(status.equals("COMPLETED")){

            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedDate = currentDate.format(formatter);
            task.setCompleted_on(formattedDate);
//            System.out.println("inside if");
//            taskRepository.save(task);
        }
        task.setStatus(Status.valueOf(status));
        taskRepository.save(task);
        return "task status is updated";
    }

    public String updateTask(Long taskId, TaskRequest taskRequest) {
        Tasks tasks=taskRepository.findById(taskId).get();
        tasks.setStatus(Status.valueOf(taskRequest.getStatus()));
        tasks.setTaskName(taskRequest.getTaskName());
        tasks.setDescription(taskRequest.getDescription());
        tasks.setProjectId(taskRequest.getProjectId());
        tasks.setDue_date(taskRequest.getDue_date());
        tasks.setCompleted_on(taskRequest.getCompleted_on());
        tasks.setAssignedBy(taskRequest.getAssigned_by());
        tasks.setAssignedTo(taskRequest.getAssigned_to());
        taskRepository.save(tasks);
        return "your task is updated";
    }

    public List<Tasks> getAllTasks(String authorizationHeader) {
        String token = authorizationHeader.substring("Bearer ".length());
        String assignedToEmail= jwtService.extractUserName(token);
        return taskRepository.findByAssignedTo(assignedToEmail);
    }

    public List<Tasks> getProjectTasksYouCreated(Long id, String authHeader) {
        String token = authHeader.substring("Bearer ".length());
        String email= jwtService.extractUserName(token);
        return taskRepository.findByProjectIdAndAssignedBy(id,email);
    }

//    public String deleteTask(Long id) {
//
//        taskRepository.deleteById(id);
//        return "task is deleted";
//    }
}
