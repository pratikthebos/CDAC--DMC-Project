package com.sunbeam.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Courses;
import com.sunbeam.entities.Faculty;

@Repository
public interface FacultyDao extends JpaRepository<Faculty, Integer> {

	
	     Faculty findByEmail(String email);

	  @Modifying
	    @Query("UPDATE Faculty f SET f.status = 'inactive' WHERE f.id = :id")
	    int changeStatus(@Param("id") int id);
	  
	  @Query("SELECT f FROM Faculty f WHERE f.status = 'active'")
	List<Faculty> findByStatus(String string);
    
}
