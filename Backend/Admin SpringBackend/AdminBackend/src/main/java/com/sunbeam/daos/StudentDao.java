package com.sunbeam.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.entities.Student;

public interface StudentDao extends JpaRepository<Student, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.status = 'inactive' WHERE s.stdId = :id")
    int changeStatus(int id);

  
    @Query("SELECT s FROM Student s WHERE s.status = 'active'")
	List<Student> getCurrentStudent(String status);
}
