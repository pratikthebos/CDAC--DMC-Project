package com.sunbeam.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeam.entities.Courses;

@Service
public interface CoursesService {

	List<Courses> getAllCourses();

	Courses addCourse(Courses cour);

	String deleteCourse(int id);

	 

}
