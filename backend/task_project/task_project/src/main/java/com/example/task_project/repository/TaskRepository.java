package com.example.task_project.repository;

import com.example.task_project.dto.TaskResponse;
import com.example.task_project.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Tasks,Long> {
//    List<Tasks>getAssignedTo(Long assigned_to);
        List<Tasks> findByAssignedTo(String assigned_to);
        List<Tasks> findByProjectIdAndAssignedBy(Long projectId, String assignedBy);
}
