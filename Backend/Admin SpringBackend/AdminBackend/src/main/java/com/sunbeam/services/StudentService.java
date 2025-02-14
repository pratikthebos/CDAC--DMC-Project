package com.sunbeam.services;

import java.util.List;

import com.sunbeam.entities.Student;

public interface StudentService {

	List<Student> getAllStudents();

	Student getStudentById(int id);

	Student editStudent(Student student,int id);

	Student addStudent(Student student);

	String deleteStudent(int id);

	List<Student> getActiveStudents();

	

}
