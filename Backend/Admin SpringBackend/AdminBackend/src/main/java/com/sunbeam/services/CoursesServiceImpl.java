package com.sunbeam.services;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.daos.CoursesDao;
import com.sunbeam.entities.Courses;

@Transactional
@Service
public class CoursesServiceImpl implements CoursesService {
	
	@Autowired
	private CoursesDao coursesDao;

	@Override
	public List<Courses> getAllCourses() {
	    List<Courses> list = coursesDao.findByStatus("active");
	    return list;
	}

	

	@Override
	public Courses addCourse(Courses cour) {
	Courses cours = coursesDao.save(cour);
	System.out.println(cours);
		return cours;
	}



	@Override
	public String deleteCourse(int id) {
	    
	    int count = coursesDao.changeStatus(id);
	    
	    if(count > 0) {
	        return "Course status updated to inactive successfully.";
	    } else {
	        return "Course not found or status update failed.";
	    }
	}


	


}
