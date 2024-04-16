package com.example.task_project.repository;

import com.example.task_project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project>findByProjectManagerId(String email);
}
