package com.sunbeam.daos;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Courses;

@Repository
public interface CoursesDao extends JpaRepository<Courses, Integer>{

	@Query("SELECT c FROM Courses c WHERE c.status = 'active'")
	List<Courses> findByStatus(String status);
	
	  @Modifying
	    @Query("UPDATE Courses c SET c.status = 'inactive' WHERE c.id = :id")
	    int changeStatus(@Param("id") int id);

	
}




