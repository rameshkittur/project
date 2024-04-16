package com.example.task_project.controller;

import com.example.task_project.Service.TaskService;
import com.example.task_project.dto.StatusRequest;
import com.example.task_project.dto.TaskRequest;
import com.example.task_project.dto.TaskResponse;
import com.example.task_project.model.Tasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TasksController {
    @Autowired
    private TaskService taskService;
    @PostMapping("/new")
    public ResponseEntity<String>addNewTask(@RequestBody TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.addNewTask(taskRequest));
    }
    @GetMapping("{id}")
    public ResponseEntity<TaskResponse>getTask(@PathVariable("id") Long task_id){
        return ResponseEntity.ok(taskService.getTask(task_id));
    }
   @PutMapping("/status/update/{id}")
   public ResponseEntity<String>updateStatus(@PathVariable("id") Long task_id
           , @RequestBody StatusRequest statusRequest){
       return ResponseEntity.ok(taskService.updateStatus(task_id,statusRequest));
   }
   @PutMapping("/update/{id}")
    public ResponseEntity<String>updateTask(@PathVariable("id") Long task_id,@RequestBody TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.updateTask(task_id,taskRequest));
   }
   @GetMapping("/assignedTo")
    public ResponseEntity<List<Tasks>>getAllTasks(@RequestHeader("Authorization") String authorizationHeader){
        return ResponseEntity.ok(taskService.getAllTasks(authorizationHeader));
   }

   @GetMapping("/tasksYouCreated/{projectId}")
    public ResponseEntity<List<Tasks>>getProjectTasksYouCreated(@PathVariable("projectId") Long id,@RequestHeader("Authorization") String authHeader){
        return ResponseEntity.ok(taskService.getProjectTasksYouCreated(id,authHeader));
   }
}
