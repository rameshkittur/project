package com.example.task_project.controller;

import com.example.task_project.Service.ProjectService;
import com.example.task_project.dto.*;
import com.example.task_project.model.Project;
import com.example.task_project.model.Tasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @PostMapping("/new")
    public ResponseEntity<String>addNewProject(@RequestBody ProjectInputDto projectInputDto){
       return ResponseEntity.ok(projectService.addNewProject(projectInputDto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Project>getProject(@PathVariable("id") Long project_id){
        return ResponseEntity.ok(projectService.getProject(project_id));
    }
    @GetMapping("/all")
    public ResponseEntity<List<Project>>getAllProject(){
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/allProjectsAssigned")
    public ResponseEntity<List<SimpleProjectDetailResponse>>getAllProjectAssigned(@RequestHeader("Authorization") String authorization){
        return  ResponseEntity.ok(projectService.getAllProjectsAssigned(authorization));
    }

    @GetMapping("/yourProjectsInDetail")
    public ResponseEntity<List<Project>>getYourProject(@RequestHeader("Authorization") String authorization){
        return ResponseEntity.ok(projectService.getYourProjects(authorization));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String>updateProject(@PathVariable Long id,@RequestBody ProjectInputDto projectInputDto){
        return ResponseEntity.ok(projectService.updateProject(id,projectInputDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String>deleteProject(@PathVariable Long id){
        return ResponseEntity.ok(projectService.deleteProject(id));
    }

    // add new tasks for the project if needed
    @PutMapping("/add/tasks/{project_id}")
    public ResponseEntity<String>addTaskToProject(@PathVariable Long project_id, @RequestBody TaskIdRequest taskIdRequest){
        return ResponseEntity.ok(projectService.addTaskToProject(project_id,taskIdRequest));
    }
    //delete  a task from respective project
    @PutMapping("/{project_id}/task/{task_id}")
    public ResponseEntity<String>deleteTaskFromProject(@PathVariable("project_id") Long project_id
            ,@PathVariable("task_id") Long task_id){
        return ResponseEntity.ok(projectService.deletTaskFromProject(project_id,task_id));
    }
    @PutMapping("/status/update/{id}")
    public ResponseEntity<String>updateStatus(@PathVariable("id") Long project_id
            , @RequestBody StatusRequest statusRequest){
        return ResponseEntity.ok(projectService.updateStatus(project_id,statusRequest));
    }
    //try to get all tasks associated with project
    @GetMapping("/all/tasks/{id}")
    public ResponseEntity<List<Tasks>>getAllTasks(@PathVariable("id") Long project_id){
        return ResponseEntity.ok(projectService.getAllTasks(project_id));
    }


}
