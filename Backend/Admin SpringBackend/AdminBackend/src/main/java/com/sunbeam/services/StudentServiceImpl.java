package com.sunbeam.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.daos.StudentDao;
import com.sunbeam.entities.Student;

@Transactional
@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentDao studentDao;
	
	@Override
	public List<Student> getAllStudents() {
		List<Student> list = studentDao.findAll();
		return list;
	}

	@Override
	public Student getStudentById(int id) {
	Optional<Student> stud = studentDao.findById(id);
	 if(stud.isPresent()) {
		 Student student = stud.get();
		 return student;
	 }
	//if null To-Do
	 
		return null;
	}

	@Override
	public Student editStudent(Student stud, int id) {
	    Optional<Student> existingStudentOpt = studentDao.findById(id);
	    
	    if (existingStudentOpt.isPresent()) {
	        Student existingStudent = existingStudentOpt.get();
	        
	        existingStudent.setFirstName(stud.getFirstName());
	        existingStudent.setLastName(stud.getLastName());
	        existingStudent.setEmail(stud.getEmail());
	        existingStudent.setPassword(stud.getPassword());
	        existingStudent.setAddress(stud.getAddress());
	        existingStudent.setPhotoImageName(stud.getPhotoImageName());
	        existingStudent.setBirthDate(stud.getBirthDate());
	        existingStudent.setGender(stud.getGender());
	        
	        return studentDao.save(existingStudent); 
	    } else {
	        return null;
	    }
	}

	@Override
	public Student addStudent(Student student) {
		Student stud = studentDao.save(student);
		return stud;
	}

	@Override
	public String deleteStudent(int id) {
	    
	    int count = studentDao.changeStatus(id);
	    
	    if(count > 0) {
	        return "Course status updated to inactive successfully.";
	    } else {
	        return "Course not found or status update failed.";
	    }
	}

	@Override
	public List<Student> getActiveStudents() {
	List<Student> list	= studentDao.getCurrentStudent("active");
		return list;
	}

	


}
