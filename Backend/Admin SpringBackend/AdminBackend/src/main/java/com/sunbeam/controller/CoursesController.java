package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.entities.Courses;
import com.sunbeam.entities.ShowResult;
import com.sunbeam.services.CoursesService;

@CrossOrigin
@RestController
public class CoursesController {

	@Autowired
	private CoursesService coursesService;


	@GetMapping("/courses/active")
	public ShowResult<?> getAll() {
		List<Courses> list = coursesService.getAllCourses();
		return ShowResult.success(list);
	}

	@PostMapping("/course")
	public ShowResult<?> addCourse(@RequestBody Courses cour) {
		Courses courses = coursesService.addCourse(cour);
		return ShowResult.success(courses);
	}
	
	@DeleteMapping("/course/{id}")
	public ShowResult<?> deleteCourse(@PathVariable("id") int id) {
	 String message = coursesService.deleteCourse(id);
	 return ShowResult.success(message);  
	}

}
