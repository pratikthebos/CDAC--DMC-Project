package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.entities.Student;
import com.sunbeam.services.StudentService;

@CrossOrigin
@RestController
public class StudentController {
	
	@Autowired
	private StudentService studentService;

	@GetMapping("/students/all")
	public ResponseEntity<List<Student>> getAll(){
		List<Student> list = studentService.getAllStudents();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/students")
	public ResponseEntity<List<Student>> getActiveStudents(){
		List<Student> list = studentService.getActiveStudents();
		return ResponseEntity.ok(list);
	}
	
	
	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getStudent(@PathVariable("id") int id){
		Student stud = studentService.getStudentById(id);
		return ResponseEntity.ok(stud);
		
		//if null To-Do
	}
	
	@PutMapping("/student/{id}")
	public ResponseEntity<Student> editStudent(@RequestBody Student student, @PathVariable("id") int id){
		 
		Student stud = studentService.editStudent(student,id);
		return ResponseEntity.ok(stud);
	}
	
	
	@PostMapping("/student")
	public ResponseEntity<Student> addStudent(@RequestBody Student student){
		Student stud = studentService.addStudent(student);
		return ResponseEntity.ok(stud);
	}
	
	
	@DeleteMapping("/student/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable("id") int id) {
	 String message = studentService.deleteStudent(id);
	 return ResponseEntity.ok(message);  
	}
	
	
}
